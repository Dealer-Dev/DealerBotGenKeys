// router.js – Routes and Telegram command dispatcher
import { sendMessage } from "./telegram.js";

// Command handlers
import startCmd from "./handlers/start.js";
import keygenCmd from "./handlers/keygen.js";
import helpCmd from "./handlers/help.js";
import statusCmd from "./handlers/status.js";
import mykeysCmd from "./handlers/mykeys.js";
import totalCmd from "./handlers/total.js";
import validateEndpoint from "./handlers/validate.js";

export default {

  // Main Telegram handler
  async handleTelegram(request, env, ctx) {
    const data = await request.json();

    // Telegram sends "message" for standard messages
    const msg = data.message || data.edited_message;
    if (!msg) {
      return new Response(JSON.stringify({ ok: true }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    const chatId = msg.chat.id;
    const text = msg.text || "";
    const username = msg.from?.username || "Unknown";

    // Detect command
    const command = text.split(" ")[0].toLowerCase();

    // Dispatch to the corresponding handler
    switch (command) {
      case "/start":
        return startCmd(chatId, username, env);

      case "/keygen":
        return keygenCmd(chatId, username, env);

      case "/help":
        return helpCmd(chatId, username, env);

      case "/status":
        return statusCmd(chatId, username, env);

      case "/mykeys":
        return mykeysCmd(chatId, username, env);

      case "/total":
        return totalCmd(chatId, username, env);

      default:
        return sendMessage(
          env,
          chatId,
          "❓ Comando no reconocido.\nUsa /help para ver los comandos disponibles."
        );
    }
  },

  // Handle /validate endpoint for Script Dealer
  async handleValidate(request, env, ctx) {
    return validateEndpoint(request, env);
  }
};
