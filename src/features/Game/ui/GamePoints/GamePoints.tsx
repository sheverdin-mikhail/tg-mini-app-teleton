import { LargeTitle, Spinner } from '@telegram-apps/telegram-ui';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { getUserIsLoading, getUserTotalPoins } from '@/entities/User';
import { useSpring, animated } from '@react-spring/web';
import cls from './GamePoints.module.scss';
import { ViewsIcon } from '@/shared/ui/ViewsIcon/ViewsIcon';

interface GamePointsProps {
  className?: string;
}

export const GamePoints: React.FC<GamePointsProps> = (props) => {
  const { className } = props;
  const userPoints = useSelector(getUserTotalPoins);
  const userIsLoading = useSelector(getUserIsLoading);

  const anime = useSpring({
    points: +userPoints,
    config: { duration: 500 },
  });

  return (
    <LargeTitle
      weight="1"
      className={clsx(cls.points, className)}
    >
      {(userIsLoading && userPoints === 0) ? <Spinner size="m" />
        : (
          <>
            <ViewsIcon className={cls.icon} gradient/>
            <animated.div className={cls.numbers}>
              {
                anime.points.to((value) => Math.trunc(value))
              }
            </animated.div>
          </>
        )}
    </LargeTitle>
  );
};
