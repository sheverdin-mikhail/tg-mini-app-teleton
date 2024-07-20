import clsx from 'clsx';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import cls from './QuestsListSkeleton.module.scss';

interface QuestsListSkeletonProps {
    className?: string;
}

export const QuestsListSkeleton: React.FC<QuestsListSkeletonProps> = (props) => {
  const { className } = props;

  return (
    <div className={clsx(cls.questsListSkeleton, {}, [className])}>
      <Skeleton width="45%" height="120px" />
      <Skeleton width="45%" height="120px" />
      <Skeleton width="45%" height="120px" />
      <Skeleton width="45%" height="120px" />
    </div>
  );
};
