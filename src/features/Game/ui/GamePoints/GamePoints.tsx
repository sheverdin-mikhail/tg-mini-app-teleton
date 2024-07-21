import { LargeTitle, Spinner } from '@telegram-apps/telegram-ui';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { getUserIsLoading, getUserTotalPoins } from 'entities/User';
import { useSpring, animated } from '@react-spring/web';
import cls from './GamePoints.module.scss';

interface GamePointsProps {
  className?: string;
}

export const GamePoints: React.FC<GamePointsProps> = (props) => {
  const { className } = props;
  const userPoints = useSelector(getUserTotalPoins);
  const userIsLoading = useSelector(getUserIsLoading);

  const anime = useSpring({
    points: +userPoints,
    config: { duration: 1000 },
  });

  return (
    <LargeTitle
      weight="1"
      className={clsx(cls.points, className)}
    >
      {(userIsLoading && userPoints === 0) ? <Spinner size="m" />
        : (
          <animated.div>
            {
              anime.points.to((value) => value.toFixed(0))
            }
          </animated.div>
        )}
    </LargeTitle>
  );
};
