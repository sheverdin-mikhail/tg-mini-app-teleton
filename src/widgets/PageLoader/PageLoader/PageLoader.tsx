import clsx from 'clsx';
import LogoImage from '@/shared/assets/img/logo.jpg';
import cls from './PageLoader.module.scss';
import { Title } from '@telegram-apps/telegram-ui';
import { AwesomeIcon } from '@/shared/ui/AwesomeIcon/AwesomeIcon';

interface PageLoaderProps {
    className?: string;
}

export const PageLoader: React.FC<PageLoaderProps> = (props) => {
  const { className } = props;

  return (
    <div className={clsx(cls.pageLoader, {}, [className ?? ''])}>
      <div className={cls.block}>
        <img src={LogoImage} className={cls.logo} />
        <Title weight='1' className={cls.title}>
          TeleTON
        </Title>
      </div>
     <div className={cls.icons}>
      <AwesomeIcon icon='fa-brands fa-telegram'/>
      <AwesomeIcon icon='fa-brands fa-square-x-twitter'/>
     </div>
    </div>
  );
};
