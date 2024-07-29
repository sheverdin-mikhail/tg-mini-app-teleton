import clsx from 'clsx';
import { PageLoader } from '@/widgets/PageLoader';
import { useEffect, useState } from 'react';
import { useTelegram } from '@/shared/lib/hooks/useTelegram/useTelegram';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '@/shared/lib/hooks/useUserData/useUserData';
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
          createUserToken(tgDataRow).then((res) => {
            if (res.status === 'success') {
              navigate('/');
            }
          });
        } catch (e) {
          console.error(e);
        }
      } else if (token) {
        navigate('/');
      }
    } else {
      setIsInit(true);
    }
  }, [isInit, token, createUserToken, navigate, tgDataRow]);

  return (
    <div className={clsx(cls.loadingPage, {}, [className])}>
      <PageLoader />
    </div>
  );
};
