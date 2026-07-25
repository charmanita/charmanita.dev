export async function GET() {
    try {
        const res = await fetch('https://map.charmanita.dev/', { cache: 'no-store' });
        return new Response(null, { status: res.ok ? 200 : 503 });
    } catch {
        return new Response(null, { status: 503 });
    }
}