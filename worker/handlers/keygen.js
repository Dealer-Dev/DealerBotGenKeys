// keygen.js – /keygen command handler

import { sendMessage, sendMessageWithButton } from "../telegram.js";
import { isAdmin } from "../utils/auth.js";
import { generateKey } from "../utils/generator.js";
import { saveKey } from "../utils/db.js";

export default async function keygenCmd(chatId, username, env) {
  // Check permissions
  if (!isAdmin(env, chatId)) {
    return sendMessageWithButton(
      env,
      chatId,
      `🚫 No tienes permisos para usar este comando.
Tu Telegram ID es: ${chatId}

Contacta al administrador si deseas acceso.`,
      "Contactar al admin",
      "https://t.me/DealerServices235"
    );
  }

  // Generate key
  const key = generateKey();

  const now = new Date();
  const expires = new Date(now.getTime() + 2 * 60 * 60 * 1000); // +2 horas

  const keyData = {
    key,
    owner: `@${username}`,
    owner_id: chatId,
    created_at: now.toISOString(),
    expires_at: expires.toISOString(),
    used: false
  };

  // Save to KV
  await saveKey(env, key, keyData);

  // Send in PRE block (tap to copy)
  const message = `
🔐 <b>Key generada correctamente xd</b>


${key}


Generada por: @${username}
Expira en: 2 horas
`;

  return sendMessage(env, chatId, message);
}
