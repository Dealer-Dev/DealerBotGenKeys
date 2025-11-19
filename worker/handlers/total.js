// total.js – /total command handler

import { sendMessage } from "../telegram.js";
import { isAdmin } from "../utils/auth.js";
import { listKeys } from "../utils/db.js";

export default async function totalCmd(chatId, username, env) {
  // Only admins can use
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

  const message =
`📈 <b>Total de keys</b>

<b>Creadas:</b> ${allKeys.length}
<b>Usadas:</b> ${used}
<b>Activas:</b> ${active}
<b>Expiradas:</b> ${expired}`;

  return sendMessage(env, chatId, message);
}
