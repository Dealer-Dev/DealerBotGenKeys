// index.js – Main entrypoint for Cloudflare Worker

import router from "./router.js";

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const pathname = url.pathname;

      // Handle Telegram Webhook:
      // https://keys.script-dealer.com/telegram
      if (pathname === "/telegram") {
        return router.handleTelegram(request, env, ctx);
      }

      // Handle Script Dealer validation:
      // https://keys.script-dealer.com/validate?key=XXXXX
      if (pathname === "/validate") {
        return router.handleValidate(request, env, ctx);
      }

      // Default route — unknown path
      return new Response(
        JSON.stringify({ error: "Invalid endpoint", path: pathname }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" }
        }
      );

    } catch (err) {
      return new Response(
        JSON.stringify({ error: "Internal error", details: err.message }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
  }
};
