import { error } from "console";
import type { Actions, PageServerLoad } from "./$types";
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ platform }) => {
    if(!platform?.env?.GUESTBOOK_DB) {
        return { entries: []};
    }

    try {
        const result = await platform.env.GUESTBOOK_DB
            .prepare('SELECT id, name, message, created_at FROM entries ORDER BY created_at DESC LIMIT ?')
            .bind(50)
            .all();
        return { entries: result.results };
    } catch (err) {
        console.error('Failed to load guestbook entries: ', err);
        return { entries: []};
    };
};
export const actions: Actions = {
    default: async ({ request, platform }) => {
        if (!platform?.env?.GUESTBOOK_DB) {
            return fail(500, { error: 'Database unavailable'});
        }

        const formData = await request.formData();
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        if (typeof name !== 'string' || name.trim() === '') {
            return fail(400, { error: 'Name is required' });
        }
        if (typeof message !== 'string' || message.trim() === '') {
            return fail(400, { error: 'Message is required' });
        }

        const emailValue = typeof email === 'string' && email.trim() !== '' ? email.trim() : null;
        if (emailValue && !emailValue.includes('@')) {
            return fail(400, { error: 'That is not a valid email' });
        }

        try {
            await platform.env.GUESTBOOK_DB
                .prepare('INSERT INTO entries (name, email, message) VALUES (?, ?, ?)')
                .bind(name.trim(), emailValue, message.trim())
                .run();
        } catch (err) {
            console.error('Failed to insert guestbook entry:', err);
            return fail(500, { error: 'Failed to save entry' });
        }

        if (emailValue) {
            try {
                await fetch('https://blog.charmanita.dev/api/subscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify({ email: emailValue })
                });
            } catch (err) {
                // To prevent guestbook submission if subscribe endpoint doesn't work.
                console.error('Failed to subscribe email:', err);
            }
        }

        return { success: true };

        } 
    }
