// validate.js – HTTP endpoint for Script Dealer

import { getKey, markUsed } from "../utils/db.js";

export default async function validateEndpoint(request, env) {
  const url = new URL(request.url);
  const key = url.searchParams.get("key");

  if (!key) {
    return jsonResponse({ valid: false, reason: "missing_key" }, 400);
  }

  const keyData = await getKey(env, key);

  if (!keyData) {
    return jsonResponse({ valid: false, reason: "not_found" }, 404);
  }

  const now = new Date();
  const expires = new Date(keyData.expires_at);

  // Key expired
  if (expires < now) {
    return jsonResponse({ valid: false, reason: "expired" }, 403);
  }

  // Key already used
  if (keyData.used === true) {
    return jsonResponse({ valid: false, reason: "used" }, 403);
  }

  // Valid key → mark as used
  await markUsed(env, key);

  return jsonResponse({
    valid: true,
    owner: keyData.owner,
    expires_at: keyData.expires_at,
    used: false
  }, 200);
}

// Helper for response JSON
function jsonResponse(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status: status,
    headers: { "Content-Type": "application/json" }
  });
}
