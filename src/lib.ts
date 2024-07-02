import { isTMA, postEvent } from "@tma.js/sdk";

export async function setupTelegramWebAppClosingConfirmation(
  needsConfirmation: boolean
) {
  const isTelegramMiniAppEnvironment = await isTMA();

  if (!isTelegramMiniAppEnvironment) return false;

  postEvent("web_app_setup_closing_behavior", {
    need_confirmation: needsConfirmation,
  });
}
