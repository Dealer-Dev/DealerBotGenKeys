// keygen.js – /keygen command handler

import { sendMessage, sendMessageWithButtons } from "../telegram.js";
import { isAdmin } from "../utils/auth.js";
import { generateKey } from "../utils/generator.js";
import { saveKey } from "../utils/db.js";

export default async function keygenCmd(chatId, username, env) {

  // Permisos
  if (!isAdmin(env, chatId)) {
    return sendMessageWithButtons(
      env,
      chatId,
      `🚫 No tienes permisos para usar este comando.\nTu Telegram ID es: <b>${chatId}</b>`,
      [
        [
          {
            text: "📨 Contactar al admin",
            url: "https://t.me/DealerServices235"
          }
        ]
      ]
    );
  }

  // Generar key
  const key = generateKey();

  const now = new Date();
  const expires = new Date(now.getTime() + 2 * 60 * 60 * 1000);

  const keyData = {
    key,
    owner: `@${username}`,
    owner_id: chatId,
    created_at: now.toISOString(),
    expires_at: expires.toISOString(),
    used: false
  };

  await saveKey(env, key, keyData);

  // 🔥 1) Enviar mensaje principal
  await sendMessage(
    env,
    chatId,
    `🔐 <b>Key generada correctamente</b>\n\n` +
    `Generada por: @${username}\n` +
    `Expira en: 2 horas`
  );

  // 🔥 2) Enviar la KEY sola, como mensaje independiente (tap-to-copy)
  await sendMessageWithButtons(
    env,
    chatId,
    `👉 <b>${key}</b>`,
    [
      [
        {
          text: "📋 Copiar KEY",
          switch_inline_query: key
        }
      ]
    ]
  );

  return new Response("OK");
}
