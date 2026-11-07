const ORIGINS = new Set(['https://amoldericksoans.github.io', 'http://localhost:5173', 'http://127.0.0.1:5173', 'http://127.0.0.1:4173', 'http://127.0.0.1:4174']);
const MAX_BODY = 16000;
const fields = { title: 160, sourceUrl: 2048, locationApprox: 160, locationPrecision: 30, price: 80, area: 80, developer: 160, notes: 3000, contact: 200 };
const json = (data, status, cors = {}) => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...cors } });

export function validate(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return 'Invalid submission.';
  for (const [key, max] of Object.entries(fields)) {
    if (input[key] !== undefined && (typeof input[key] !== 'string' || input[key].length > max)) return `Invalid ${key}.`;
  }
  if (!input.title?.trim() || !input.locationApprox?.trim()) return 'Property title and approximate location are required.';
  if (!['approximate', 'locality', 'exact'].includes(input.locationPrecision)) return 'Choose a location precision.';
  if (input.sourceUrl) { try { if (!['http:', 'https:'].includes(new URL(input.sourceUrl).protocol)) return 'Source URL must be HTTP or HTTPS.'; } catch { return 'Enter a valid source URL.'; } }
  if (input.contact?.trim() && input.consent !== true) return 'Contact information requires consent.';
  return null;
}
async function authorized(request, secret) {
  if (!secret) return false;
  const provided = request.headers.get('Authorization') || '';
  const encoder = new TextEncoder();
  const [a, b] = await Promise.all([crypto.subtle.digest('SHA-256', encoder.encode(provided)), crypto.subtle.digest('SHA-256', encoder.encode(`Bearer ${secret}`))]);
  return crypto.subtle.timingSafeEqual(a, b);
}
export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    const cors = origin && ORIGINS.has(origin) ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' } : {};
    const path = new URL(request.url).pathname;
    if (request.method === 'OPTIONS') return origin && ORIGINS.has(origin) ? new Response(null, { status: 204, headers: { ...cors, 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization', 'Access-Control-Max-Age': '600' } }) : json({ error: 'Origin not allowed.' }, 403);
    if (path === '/api/intake' && request.method === 'POST') {
      if (!origin || !ORIGINS.has(origin)) return json({ error: 'Origin not allowed.' }, 403);
      if (!env.RATE_LIMITER || !env.DB) return json({ error: 'Service unavailable.' }, 503, cors);
      const ip = request.headers.get('CF-Connecting-IP');
      if (!ip) return json({ error: 'Service unavailable.' }, 503, cors);
      if (!(await env.RATE_LIMITER.limit({ key: ip })).success) return json({ error: 'Too many submissions. Try again later.' }, 429, cors);
      if (!(request.headers.get('Content-Type') || '').toLowerCase().startsWith('application/json')) return json({ error: 'Expected JSON.' }, 415, cors);
      if (Number(request.headers.get('Content-Length') || 0) > MAX_BODY) return json({ error: 'Submission too large.' }, 413, cors);
      let input;
      try { const reader = request.body.getReader(); let size = 0, raw = ''; const decoder = new TextDecoder(); while (true) { const { done, value } = await reader.read(); if (done) break; size += value.length; if (size > MAX_BODY) { await reader.cancel(); return json({ error: 'Submission too large.' }, 413, cors); } raw += decoder.decode(value, { stream: true }); } raw += decoder.decode(); input = JSON.parse(raw); } catch { return json({ error: 'Invalid JSON.' }, 400, cors); }
      if (input?.website) return json({ error: 'Submission rejected.' }, 400, cors);
      const error = validate(input); if (error) return json({ error }, 400, cors);
      const data = Object.fromEntries(Object.keys(fields).map(k => [k, (input[k] || '').trim()]));
      data.consent = input.consent === true;
      const id = crypto.randomUUID();
      try { await env.DB.prepare('INSERT INTO leads (id, created_at, payload) VALUES (?, ?, ?)').bind(id, new Date().toISOString(), JSON.stringify(data)).run(); } catch { return json({ error: 'Could not save submission. Please try again.' }, 503, cors); }
      return json({ id, message: 'Submission received.' }, 201, cors);
    }
    if (path === '/api/leads' && request.method === 'GET') {
      const ip = request.headers.get('CF-Connecting-IP');
      if (!env.RATE_LIMITER || !ip) return json({ error: 'Service unavailable.' }, 503, cors);
      if (!(await env.RATE_LIMITER.limit({ key: `admin:${ip}` })).success) return json({ error: 'Too many requests.' }, 429, cors);
      if (!(await authorized(request, env.ADMIN_TOKEN))) return json({ error: 'Unauthorized.' }, 401, cors);
      try { const result = await env.DB.prepare('SELECT id, created_at, payload FROM leads ORDER BY created_at DESC LIMIT 500').all(); return json({ leads: result.results }, 200, cors); } catch { return json({ error: 'Service unavailable.' }, 503, cors); }
    }
    return json({ error: 'Not found.' }, 404, cors);
  }
};
