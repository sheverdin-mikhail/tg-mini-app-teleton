import clsx from 'clsx';
import { Spinner } from '@telegram-apps/telegram-ui';
import cls from './PageLoader.module.scss';

interface PageLoaderProps {
    className?: string;
}

export const PageLoader: React.FC<PageLoaderProps> = (props) => {
  const { className } = props;

  return (
    <div className={clsx(cls.pageLoader, {}, [className ?? ''])}>
      <Spinner size="l" />
    </div>
  );
};
