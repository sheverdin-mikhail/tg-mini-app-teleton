import { useSelector } from 'react-redux';
import { CreateToken, getUserInfo, getUserIsInit } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { request } from '@telegram-apps/sdk';
import { useEffect, useState, useRef } from 'react';
import { useTelegram } from '@/shared/lib/hooks/useTelegram/useTelegram';
import { fetchLevelsList, getLevelsIsInit } from '@/entities/Level';
import { USER_LOCALSTORAGE_TOKEN } from '@/shared/const/localStorage';

export const useInitApp = () => {
  const { tg, tgDataRow } = useTelegram();
  const [welcomeModalIsOpen, setWelcomeModalIsOpen] = useState(false);
  const [isInit, setIsInit] = useState(false);
  const [tokenIsInit, setTokenIsInit] = useState(false);
  const userIsInit = useSelector(getUserIsInit);
  const levelsIsInit = useSelector(getLevelsIsInit);
  const dispatch = useAppDispatch();
  const hasCreatedToken = useRef(false);

  useEffect(() => {
    if (tgDataRow && !hasCreatedToken.current) {
      hasCreatedToken.current = true;
      const createToken = async () => {
        const res = await dispatch(CreateToken(tgDataRow));
        const jwtToken = res.payload!;
        if (jwtToken !== localStorage.getItem(USER_LOCALSTORAGE_TOKEN)) {
          localStorage.setItem(USER_LOCALSTORAGE_TOKEN, jwtToken);
        }
        setTokenIsInit(true);
      };
      createToken();
    }
  }, [tgDataRow, dispatch]);

  useEffect(() => {
    if (!localStorage.getItem('firstTime')) {
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
    }).then((res) => {
      if (res.is_expanded) {
        setTimeout(() => setIsInit(true), 2000);
      }
    });
  }, [tg]);

  useEffect(() => {
    if (!userIsInit && tokenIsInit) {
      dispatch(getUserInfo());
    }
  }, [userIsInit, dispatch, tokenIsInit]);

  useEffect(() => {
    if (!levelsIsInit) {
      dispatch(fetchLevelsList());
    }
  }, [levelsIsInit, dispatch]);

  useEffect(() => {
    if (tokenIsInit && userIsInit && levelsIsInit && isInit) {
      setIsInit(true);
    }
  }, [tokenIsInit, userIsInit, levelsIsInit, isInit]);

  return {
    isInit,
    welcomeModalIsOpen,
    setWelcomeModalIsOpen,
  };
};
