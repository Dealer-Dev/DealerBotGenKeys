// help.js – /help command handler

import { sendMessage } from "../telegram.js";
import { isAdmin } from "../utils/auth.js";

export default async function helpCmd(chatId, username, env) {
  
  // If admin → full help
  if (isAdmin(env, chatId)) {
    const message =
`📘 <b>Lista de comandos disponibles</b>

/start – Mostrar tu ID
/keygen – Generar key
/mykeys – Ver las keys que generaste
/status – Estado general del bot
/total – Total de keys creadas
/help – Mostrar este menú`;

    return sendMessage(env, chatId, message);
  }

  // If NOT admin → limited help
  const message =
`📘 <b>Lista de comandos disponibles</b>

/start – Mostrar tu ID
/help – Mostrar este menú`;

  return sendMessage(env, chatId, message);
}
