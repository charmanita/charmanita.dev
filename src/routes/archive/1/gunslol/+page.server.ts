import { redirect } from '@sveltejs/kit';
import type {PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    // 301 - perm redirect. 
    throw redirect(307, 'https://guns.lol/charmanita');
}