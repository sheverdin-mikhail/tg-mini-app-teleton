import clsx from 'clsx';
import { PageLoader } from 'widgets/PageLoader';
import { useUserData } from 'shared/lib/hooks/useUserData/useUserData';
import { initMainButton, initSettingsButton, MainButton } from '@telegram-apps/sdk';
import { useEffect } from 'react';
import { copyToClipboard } from 'shared/lib/utils/clipboard';
import { useTelegram } from 'shared/lib/hooks/useTelegram/useTelegram';
import cls from './LoadingPage.module.scss';

interface LoadingPageProps {
    className?: string;
}

export const LoadingPage: React.FC<LoadingPageProps> = (props) => {
  const { className } = props;

  const {} = useUserData();
  const [mainButton] = initMainButton();
  const [settingsButton] = initSettingsButton();
  const { tgDataRow } = useTelegram();

  useEffect(() => {
    mainButton.setText('Main');
    mainButton.setParams({
      isEnabled: true,
    });
    console.log('show main button');
    mainButton.show();
    settingsButton.show();
  }, []);

  useEffect(() => {
    settingsButton.on('click', () => copyToClipboard(tgDataRow!!));
  }, []);

  return (
    <div className={clsx(cls.loadingPage, {}, [className])}>
      <PageLoader />
    </div>
  );
};
