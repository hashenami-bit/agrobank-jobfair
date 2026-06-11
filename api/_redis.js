// Shared Upstash Redis REST helper for the api/ functions.
// Works with env vars injected by either Vercel KV or the Upstash marketplace integration.

const REST_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REST_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export function storageConfigured() {
  return Boolean(REST_URL && REST_TOKEN);
}

// Run a batch of Redis commands in one HTTP round-trip.
// commands: [['INCR', 'key'], ['GET', 'key2'], ...] -> [{result: ...}, ...]
export async function redis(commands) {
  const res = await fetch(`${REST_URL}/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${REST_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commands),
  });
  if (!res.ok) {
    throw new Error(`Redis pipeline failed: ${res.status}`);
  }
  return res.json();
}

// Day key in Tashkent time (UTC+5, no DST).
export function tashkentDay(offsetDays = 0) {
  const ms = Date.now() + 5 * 3600 * 1000 - offsetDays * 86400 * 1000;
  return new Date(ms).toISOString().slice(0, 10);
}
