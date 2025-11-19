// keygen.js – /keygen command handler

import { sendMessage, sendMessageWithButton } from "../telegram.js";
import { isAdmin } from "../utils/auth.js";
import { generateKey } from "../utils/generator.js";
import { saveKey } from "../utils/db.js";

function escapeMarkdownV2(text) {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&");
}

export default async function keygenCmd(chatId, username, env) {

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

  const key = generateKey();
  const safeKey = escapeMarkdownV2(key);

  const now = new Date();
  const expires = new Date(now.getTime() + 2 * 60 * 60 * 1000);

  const keyData = {
    key: key,
    owner: `@${username}`,
    owner_id: chatId,
    created_at: now.toISOString(),
    expires_at: expires.toISOString(),
    used: false
  };

  await saveKey(env, key, keyData);

  // Mensaje en MarkdownV2
  const message =
`🔐 *Key generada correctamente 🐰*\n\n\`\`\`\n${safeKey}\n\`\`\`\n\n*Generada por:* @${username}\n*Expira en:* 2 horas`;

  return sendMessage(env, chatId, message, { parse_mode: "MarkdownV2" });
}
