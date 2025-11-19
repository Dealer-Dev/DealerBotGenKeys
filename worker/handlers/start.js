// start.js – /start command handler
import { sendMessageWithButton } from "../telegram.js";

export default async function startCmd(chatId, username, env) {
  const message = 
`👋 ¡Hola @${username}!
Tu Telegram ID es: ${chatId}

Este bot genera keys para el Script Dealer.
Si deseas permisos, contacta al administrador.`;

  return sendMessageWithButton(
    env,
    chatId,
    message,
    "Contactar al admin",
    "https://t.me/DealerServices235"
  );
}
