import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    const pages = ['', 'about', 'activity', 'api', 'archive', 'calculator', 'discord', 'example', 'gate', 'gunslol', 'minecraft-server', 'status', 'snake'];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => ` <url>
    <loc>https://charmanita.dev/${page}</loc>
  </url>`).join('\n')}
  </urlset>`;

    return new Response(xml, {
        headers: {'Content-Type': 'application/xml' }
    });
};