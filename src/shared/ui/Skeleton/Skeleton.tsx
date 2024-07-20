import clsx from 'clsx';
import { Skeleton as TgSkeleton } from '@telegram-apps/telegram-ui';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
    className?: string;
    width: string;
    height?: string;
    isSquare?: boolean;
    isCircle?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = (props) => {
  const {
    className,
    width,
    height,
    isSquare = false,
    isCircle = false,
  } = props;

  return (
    <TgSkeleton
      visible
      className={clsx(cls.skeleton, {}, [className])}
      style={{
        width,
        height: isSquare ? width : height,
        borderRadius: isCircle ? '100%' : '16px',
      }}
    />
  );
};
