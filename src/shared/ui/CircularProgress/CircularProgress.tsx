import clsx from 'clsx';
import { CircularProgressProps as TGCircularProgressProps, Text, CircularProgress as TGCircularProgress } from '@telegram-apps/telegram-ui';
import cls from './CircularProgress.module.scss';

interface CircularProgressProps extends TGCircularProgressProps{
    className?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = (props) => {
  const {
    className,
    children,
    size = 'medium',
    progress = 0,
    ...otherProps
  } = props;

  return (
    <div className={clsx(cls.circularProgress, {}, [cls[size], className])}>
      <TGCircularProgress size={size} progress={progress} {...otherProps} />
      <Text className={clsx(cls.text, cls[size])}>{children}</Text>
    </div>
  );
};
