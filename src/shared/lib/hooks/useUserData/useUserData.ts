import { useCallback, useEffect, useState } from 'react';
import { $api } from 'shared/api/api';
import { USER_LOCALSTORAGE_TOKEN } from 'shared/const/localStorage';

const localStorageToken = localStorage.getItem(USER_LOCALSTORAGE_TOKEN);

export const useUserData = () => {
  const [token, setToken] = useState<string | null>(localStorageToken);
  const [isInit, setIsInit] = useState(false);

  const createUserToken = useCallback(async (initData: string) => {
    try {
      const tokensResponse = await $api.post<any>('/auth/', { initData });
      if (!tokensResponse.data) {
        throw new Error('Ошибка авторизации пользователя');
      }
      const { token } = tokensResponse.data.data;
      if (token) {
        localStorage.setItem(USER_LOCALSTORAGE_TOKEN, token);
        setToken(token);
      }
      return {
        token,
        status: 'success',
      };
    } catch (e: any) {
      return {
        error: e,
        status: 'fail',
      };
    }
  }, [setToken]);

  useEffect(() => {
    if (isInit) {
      const localStorageToken = localStorage.getItem(USER_LOCALSTORAGE_TOKEN);
      setToken(localStorageToken);
    } else {
      setIsInit(true);
    }
  }, [isInit, setIsInit]);

  return {
    token,
    setToken,
    createUserToken,
  };
};
