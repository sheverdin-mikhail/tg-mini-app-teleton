import { useSelector } from 'react-redux';
import { getUserInfo, getUserIsInit } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { request } from '@telegram-apps/sdk';
import { useEffect, useState } from 'react';
import { useTelegram } from 'shared/lib/hooks/useTelegram/useTelegram';
import { getLevelsIsInit, levelsActions } from 'entities/Level';

export const useInitApp = () => {
  const { tg } = useTelegram();
  const [welcomeModalIsOpen, setWelcomeModalIsOpen] = useState(false);
  const [tgIsInit, setTgIsInit] = useState(false);
  const [isInit, setIsInit] = useState(false);
  const userIsInit = useSelector(getUserIsInit);
  const levelsIsInit = useSelector(getLevelsIsInit);
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

    setTimeout(() => setTgIsInit(true), 2000);

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

  useEffect(() => {
    if (!levelsIsInit) {
      dispatch(levelsActions.initLevels());
    }
  }, [levelsIsInit]);

  useEffect(() => {
    if (tgIsInit && levelsIsInit && userIsInit) {
      setIsInit(true);
    }
  }, [tgIsInit, levelsIsInit, userIsInit]);

  return {
    isInit,
    welcomeModalIsOpen,
    setWelcomeModalIsOpen,
  };
};
