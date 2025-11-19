// telegram.js – Telegram API utility functions

export async function sendMessage(env, chatId, text, options = {}) {
  const token = env.TELEGRAM_BOT_TOKEN;
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  // Si el usuario NO especifica parse_mode en options,
  // usamos HTML por defecto.
  const body = {
    chat_id: chatId,
    text: text,
    parse_mode: "MarkdownV2",
    ...options
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  return res;
}


// Send message with a single button (example: Contact admin)
export async function sendMessageWithButton(env, chatId, text, buttonText, buttonUrl) {
  return sendMessage(env, chatId, text, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: buttonText,
            url: buttonUrl
          }
        ]
      ]
    }
  });
}
