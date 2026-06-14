import Cookies from 'js-cookie';

export const API = 'https://api.charmanita.dev';

export function getToken() {
    return Cookies.get('token');
}

export async function apiFetch(path: string, options: RequestInit = {}) {
    const token = getToken(); 
    return fetch(`${API}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...options.headers,
        }
    });
}