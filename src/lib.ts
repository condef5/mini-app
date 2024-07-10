import { isTMA, postEvent } from "@tma.js/sdk";
import WebApp from "@twa-dev/sdk";

let isTelegram = true;

isTMA().then((v) => (isTelegram = v));

export async function setupTelegramWebAppClosingConfirmation(
  needsConfirmation: boolean
) {
  const isTelegramMiniAppEnvironment = await isTMA();

  if (!isTelegramMiniAppEnvironment) return false;

  postEvent("web_app_setup_closing_behavior", {
    need_confirmation: needsConfirmation,
  });
}

export function openLink(url: string) {
  if (!isTelegram) {
    window.open(url);
    return;
  }

  WebApp.openLink(url);
}
