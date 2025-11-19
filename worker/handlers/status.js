// status.js – /status command handler

import { sendMessage } from "../telegram.js";
import { isAdmin, getAdminList } from "../utils/auth.js";
import { listKeys } from "../utils/db.js";

export default async function statusCmd(chatId, username, env) {
  // Permission check
  if (!isAdmin(env, chatId)) {
    return sendMessage(env, chatId, "🚫 No tienes permisos para usar este comando.");
  }

  const allKeys = await listKeys(env);
  const now = new Date();

  let active = 0;
  let used = 0;
  let expired = 0;

  for (const k of allKeys) {
    if (k.used) {
      used++;
    } else if (new Date(k.expires_at) < now) {
      expired++;
    } else {
      active++;
    }
  }

  const admins = getAdminList(env);

  const message =
`📊 <b>Estado del bot DealerBotGenKeys</b>

<b>Admins autorizados:</b> ${admins.length}
<b>Keys activas:</b> ${active}
<b>Keys usadas:</b> ${used}
<b>Keys expiradas:</b> ${expired}
<b>Total guardadas:</b> ${allKeys.length}

<b>Base de datos:</b> Online
<b>Worker:</b> Ejecutando en Cloudflare`;

  return sendMessage(env, chatId, message);
}
