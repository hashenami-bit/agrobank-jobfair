import crypto from 'node:crypto';
import { redis, storageConfigured, tashkentDay } from './_redis.js';

// Records one page view. Called by the frontend on every route view.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!storageConfigured()) {
    return res.status(500).json({ error: 'Storage not configured' });
  }

  try {
    let path = '/';
    if (req.body && typeof req.body.path === 'string') {
      path = req.body.path.slice(0, 200);
    }
    // Never count the admin panel itself.
    if (path.startsWith('/admin')) {
      return res.status(204).end();
    }

    const day = tashkentDay();
    const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
    const ua = req.headers['user-agent'] || '';
    // Anonymous visitor fingerprint — raw IP is never stored.
    const visitor = crypto.createHash('sha256').update(`${ip}|${ua}`).digest('hex');

    await redis([
      ['INCR', 'views:total'],
      ['INCR', `views:day:${day}`],
      ['HINCRBY', 'views:pages', path, 1],
      ['PFADD', 'uv:total', visitor],
      ['PFADD', `uv:day:${day}`, visitor],
    ]);

    return res.status(204).end();
  } catch {
    return res.status(500).json({ error: 'Track failed' });
  }
}
