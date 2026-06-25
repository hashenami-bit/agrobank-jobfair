import crypto from 'node:crypto';
import {
  redis,
  storageConfigured,
  tashkentDay,
  rateLimitCount,
  rateLimitHit,
  rateLimitClear,
} from './_redis.js';

const DAYS = 14;

// Brute-force protection: max failed logins per IP within the window.
const MAX_ATTEMPTS = 8;
const WINDOW_SEC = 15 * 60;

function safeEqual(a, b) {
  const ab = Buffer.from(String(a ?? ''));
  const bb = Buffer.from(String(b ?? ''));
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
}

// Returns visitor statistics. Requires admin credentials in the request body.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const adminUser = process.env.ADMIN_USER || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return res.status(500).json({ error: 'ADMIN_PASSWORD is not set on the server' });
  }

  if (!storageConfigured()) {
    return res.status(500).json({ error: 'Storage not configured' });
  }

  // Throttle repeated failed logins per client IP.
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  const rlId = `login:${ip}`;
  if ((await rateLimitCount(rlId)) >= MAX_ATTEMPTS) {
    res.setHeader('Retry-After', String(WINDOW_SEC));
    return res.status(429).json({ error: "Juda ko'p urinish. 15 daqiqadan so'ng qayta urinib ko'ring." });
  }

  const { user, password } = req.body || {};
  if (!safeEqual(user, adminUser) || !safeEqual(password, adminPassword)) {
    await rateLimitHit(rlId, WINDOW_SEC);
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Successful login — clear the failed-attempt counter for this IP.
  await rateLimitClear(rlId);

  try {
    // Oldest -> newest, today last.
    const days = Array.from({ length: DAYS }, (_, i) => tashkentDay(DAYS - 1 - i));

    const out = await redis([
      ['GET', 'views:total'],
      ['PFCOUNT', 'uv:total'],
      ['HGETALL', 'views:pages'],
      ...days.map((d) => ['GET', `views:day:${d}`]),
      ...days.map((d) => ['PFCOUNT', `uv:day:${d}`]),
    ]);
    const r = out.map((o) => o.result);

    const pagesRaw = r[2];
    const pages = [];
    if (Array.isArray(pagesRaw)) {
      for (let i = 0; i < pagesRaw.length; i += 2) {
        pages.push({ path: pagesRaw[i], views: Number(pagesRaw[i + 1]) || 0 });
      }
    } else if (pagesRaw && typeof pagesRaw === 'object') {
      for (const [p, v] of Object.entries(pagesRaw)) {
        pages.push({ path: p, views: Number(v) || 0 });
      }
    }
    pages.sort((a, b) => b.views - a.views);

    const daily = days.map((date, i) => ({
      date,
      views: Number(r[3 + i]) || 0,
      unique: Number(r[3 + DAYS + i]) || 0,
    }));

    return res.status(200).json({
      totalViews: Number(r[0]) || 0,
      totalUnique: Number(r[1]) || 0,
      today: daily[daily.length - 1],
      daily,
      pages: pages.slice(0, 10),
    });
  } catch {
    return res.status(500).json({ error: 'Stats failed' });
  }
}
