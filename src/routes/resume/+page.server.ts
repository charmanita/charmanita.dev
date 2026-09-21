import { redirect } from '@sveltejs/kit';
import type {PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    // 301 - perm redirect. 
    throw redirect(307, 'https://docs.google.com/document/d/1mIccKkDNMkIBKJ3-hCBmDUcYda-kS-Bq/edit?usp=sharing&ouid=110547424443856240539&rtpof=true&sd=true');
}