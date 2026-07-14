import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    const res = await fetch('https://api.charmanita.dev/public/services');
    const data = await res.json();
    return json(data);
};