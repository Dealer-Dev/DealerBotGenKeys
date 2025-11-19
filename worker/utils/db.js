// db.js – Cloudflare KV database wrapper

// Save key data to KV
export async function saveKey(env, key, data) {
  await env.DB.put(key, JSON.stringify(data));
}

// Get key from KV
export async function getKey(env, key) {
  const result = await env.DB.get(key);
  return result ? JSON.parse(result) : null;
}

// Mark a key as used
export async function markUsed(env, key) {
  const k = await getKey(env, key);
  if (!k) return null;

  k.used = true;
  await saveKey(env, key, k);
  return k;
}

// List all keys stored
export async function listKeys(env) {
  const list = await env.DB.list();
  const keys = [];

  for (const entry of list.keys) {
    const raw = await env.DB.get(entry.name);
    if (raw) keys.push(JSON.parse(raw));
  }

  return keys;
}

// List keys by admin ID
export async function listKeysByAdmin(env, adminId) {
  const all = await listKeys(env);
  return all.filter(k => k.owner_id == adminId);
}
