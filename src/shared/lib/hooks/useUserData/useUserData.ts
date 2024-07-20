import { useEffect } from 'react';
import { USER_LOCALSTORAGE_TOKEN } from 'shared/const/localStorage';
import { CreateToken } from 'entities/User';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../useAppDispatch/useAppDispatch';
import { useTelegram } from '../useTelegram/useTelegram';

export const useUserData = () => {
  const token = localStorage.getItem(USER_LOCALSTORAGE_TOKEN);
  const dispatch = useAppDispatch();
  const { tgDataRow } = useTelegram();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && tgDataRow) {
      try {
        dispatch(CreateToken(tgDataRow)).then((res) => console.log(res));
      } catch (e) {
        console.log(e);
      }
    }
  }, [token, tgDataRow, dispatch]);

  return {};
};
