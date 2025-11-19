// auth.js – Admin authentication utilities

// Check if a Telegram ID is admin
export function isAdmin(env, telegramId) {
  const mainAdmin = env.ADMIN_MAIN; // main admin from wrangler.toml

  // Convert to string for safe comparison
  telegramId = String(telegramId);

  // Only main admin for now
  if (telegramId === mainAdmin) return true;

  // Optional: here we will later support additional admins stored in KV
  return false;
}

// Placeholder: list all admins (for future expansion)
export function getAdminList(env) {
  return [env.ADMIN_MAIN];
}

// Placeholder: add admin (future feature)
export async function addAdmin(env, telegramId) {
  // Later we will store extra admins in KV
  return false;
}

// Placeholder: remove admin
export async function removeAdmin(env, telegramId) {
  return false;
}
