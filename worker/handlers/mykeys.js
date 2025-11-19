// mykeys.js – /mykeys command handler

import { sendMessage } from "../telegram.js";
import { isAdmin } from "../utils/auth.js";
import { listKeysByAdmin } from "../utils/db.js";

export default async function mykeysCmd(chatId, username, env) {
  // Check admin permission
  if (!isAdmin(env, chatId)) {
    return sendMessage(env, chatId, "🚫 No tienes permisos para usar este comando.");
  }

  // Get keys created by this admin
  const keys = await listKeysByAdmin(env, chatId);
  const now = new Date();

  if (keys.length === 0) {
    return sendMessage(env, chatId,
      "🔑 No has generado ninguna key todavía.");
  }

  let text = "🔑 <b>Tus keys generadas</b>\n\n";

  for (const k of keys) {
    const status = k.used
      ? "🔴 usada"
      : (new Date(k.expires_at) < now ? "⌛ expirada" : "🟢 activa");

    text += `${k.key}  —  ${status}\n`;
  }

  text += `\n<b>Total:</b> ${keys.length}`;

  return sendMessage(env, chatId, text);
}
