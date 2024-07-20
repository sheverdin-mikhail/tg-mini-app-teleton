import { retrieveLaunchParams } from '@telegram-apps/sdk';
import { TelegramWebApps } from 'app/types/global';

declare global {
    interface Window {
        Telegram: TelegramWebApps.SDK;
    }
}

export const useTelegram = () => {
  const tg = window.Telegram.WebApp;

  const { initData, initDataRaw } = retrieveLaunchParams();

  const tgUser = initData?.user;

  const closeTelegram = () => {
    tg.close();
  };

  const onToggleMainButton = () => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  };

  return ({
    tg,
    tgData: initData,
    tgDataRow: initDataRaw,
    tgUser,
    closeTelegram,
    onToggleMainButton,
  });
};
