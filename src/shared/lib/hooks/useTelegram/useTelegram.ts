import {
  initSettingsButton,
  mockTelegramEnv,
  parseInitData,
  retrieveLaunchParams,
} from '@telegram-apps/sdk';
import { TelegramWebApps } from 'app/types/global';
import { useEffect } from 'react';
import { copyToClipboard } from '../../utils/clipboard';

declare global {
    interface Window {
        Telegram: TelegramWebApps.SDK;
    }
}


// убрать на проде
// eslint-disable-next-line max-len
const initDataRaw = 'query_id=AAHWD2IuAAAAANYPYi4Y6iEg&user=%7B%22id%22%3A778178518%2C%22first_name%22%3A%22%D0%9C%D0%B8%D1%85%D0%B0%D0%B8%D0%BB%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22sheverdin_mikhail%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1722863684&hash=c13e009542d22370d5aa7e2f431835aa198f124d0f8c8cd4883a246d99b20a00';

mockTelegramEnv({
  themeParams: {
    accentTextColor: '#6ab2f2',
    bgColor: '#17212b',
    buttonColor: '#5288c1',
    buttonTextColor: '#ffffff',
    destructiveTextColor: '#ec3942',
    headerBgColor: '#17212b',
    hintColor: '#708499',
    linkColor: '#6ab3f3',
    secondaryBgColor: '#232e3c',
    sectionBgColor: '#17212b',
    sectionHeaderTextColor: '#6ab3f3',
    subtitleTextColor: '#708499',
    textColor: '#f5f5f5',
  },
  initData: parseInitData(initDataRaw),
  initDataRaw,
  version: '7.2',
  platform: 'tdesktop',
});

export const useTelegram = () => {
  const tg = window.Telegram.WebApp;

  const { initData, initDataRaw } = retrieveLaunchParams();
  const [settingsButton] = initSettingsButton();

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

  useEffect(() => {
    // @ts-ignore
    if (tg.disableVerticalSwipes) tg.disableVerticalSwipes();
    settingsButton.show()
    settingsButton.on('click', () => copyToClipboard(initDataRaw ?? ''))
  }, [])

  return ({
    tg,
    tgData: initData,
    tgDataRow: initDataRaw,
    tgUser,
    closeTelegram,
    onToggleMainButton,
  });
};
