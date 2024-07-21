import './styles/index.scss';

import { useEffect, useState } from 'react';
import { useTelegram } from 'shared/lib/hooks/useTelegram/useTelegram';
import { WelcomeModal } from 'widgets/WelcomeModal';
import { request } from '@telegram-apps/sdk';
import { PageLoader } from 'widgets/PageLoader';
import { useSelector } from 'react-redux';
import { getUserInfo, getUserIsInit } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AppRouter } from './router';

const App = () => {
  const { tg } = useTelegram();
  const [welcomeModalIsOpen, setWelcomeModalIsOpen] = useState(false);
  const [isInit, setIsInit] = useState(false);
  const userIsInit = useSelector(getUserIsInit);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const firstTime = localStorage.getItem('firstTime');

    if (Number(firstTime) === null || Number(firstTime) === 0) {
      setWelcomeModalIsOpen(true);
      localStorage.setItem('firstTime', 'true');
    }
  }, []);

  useEffect(() => {
    tg.ready();

    setTimeout(() => setIsInit(true), 2000);

    request({
      method: 'web_app_expand',
      event: 'viewport_changed',
    })
      .then((res) => res.is_expanded && setTimeout(() => setIsInit(true), 2000));
  }, [tg]);

  useEffect(() => {
    if (!userIsInit) {
      dispatch(getUserInfo());
    }
  }, [userIsInit, dispatch]);

  return (
    <>
      {
        isInit
          ? (
            <>
              <AppRouter />
              <WelcomeModal isOpen={welcomeModalIsOpen ?? false} setIsOpen={setWelcomeModalIsOpen} />
            </>
          )
          : <PageLoader />
      }
    </>
  );
};

export default App;
