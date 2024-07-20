import clsx from 'clsx';
import { PageLoader } from 'widgets/PageLoader';
import { useEffect, useState } from 'react';
import { useTelegram } from 'shared/lib/hooks/useTelegram/useTelegram';
import { useNavigate } from 'react-router-dom';
import { useUserData } from 'shared/lib/hooks/useUserData/useUserData';
import { USER_LOCALSTORAGE_TOKEN } from 'shared/const/localStorage';
import cls from './LoadingPage.module.scss';

interface LoadingPageProps {
    className?: string;
}

export const LoadingPage: React.FC<LoadingPageProps> = (props) => {
  const { className } = props;
  const [isInit, setIsInit] = useState(false);

  const { token, createUserToken } = useUserData();
  const { tgDataRow } = useTelegram();
  const navigate = useNavigate();

  useEffect(() => {
    if (isInit) {
      if (!token && tgDataRow) {
        try {
          // вернуть на проде
          createUserToken(tgDataRow).then((res) => {
            if (res.status === 'success') {
              navigate(-1);
            }
          });
          // localStorage.setItem(USER_LOCALSTORAGE_TOKEN, process.env.REACT_APP_JWT_TOKEN!!); // убрать на проде
        } catch (e) {
          console.log(e);
        }
      } else if (token) {
        navigate('/');
      }
    } else {
      setIsInit(true);
    }
  }, [isInit, setIsInit, navigate, token, tgDataRow, createUserToken]);

  return (
    <div className={clsx(cls.loadingPage, {}, [className])}>
      <PageLoader />
    </div>
  );
};
