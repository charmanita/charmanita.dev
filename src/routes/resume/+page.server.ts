import { redirect } from '@sveltejs/kit';
import type {PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    // 301 - perm redirect. 
    throw redirect(307, 'https://docs.google.com/document/d/1LtMuD6hg-Bl1NxpAoifkqTf3rVmJXUqC/edit?usp=sharing&ouid=110547424443856240539&rtpof=true&sd=true');
}