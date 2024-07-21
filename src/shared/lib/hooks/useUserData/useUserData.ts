import { getUserIsInit } from 'entities/User';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { $api } from 'shared/api/api';
import { USER_LOCALSTORAGE_TOKEN } from 'shared/const/localStorage';

const localStorageToken = localStorage.getItem(USER_LOCALSTORAGE_TOKEN);

export const useUserData = () => {
  const [tokenData, setTokenData] = useState<string | null>(localStorageToken);
  const userIsInit = useSelector(getUserIsInit);

  const createUserToken = useCallback(async (initData: string) => {
    try {
      const tokensResponse = await $api.post<any>('/auth/', { initData });
      if (!tokensResponse.data) {
        throw new Error('Ошибка авторизации пользователя');
      }
      const { token } = tokensResponse.data.data;
      if (token) {
        localStorage.setItem(USER_LOCALSTORAGE_TOKEN, token);
        setTokenData(token);
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
  }, [setTokenData]);

  return {
    token: tokenData,
    setToken: setTokenData,
    createUserToken,
    isInit: userIsInit,
  };
};
