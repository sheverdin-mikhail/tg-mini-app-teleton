import { Spinner } from '@telegram-apps/telegram-ui';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { getUserIsLoading, getUserTotalPoins } from '@/entities/User';
import { useSpring, animated } from '@react-spring/web';
import { ViewsIcon } from '@/shared/ui/ViewsIcon/ViewsIcon';
import { FontSize, FontWeight, Text } from '@/shared/ui/Text/Text';
import cls from './GamePoints.module.scss';
import { formatNumberWithSpaces } from '@/shared/lib/utils/formatNumber';


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
    <Text
      weight={FontWeight.BLACK}
      size={FontSize.XL}
      className={clsx(cls.points, className)}
    >
      {(userIsLoading && userPoints === 0) ? <Spinner size="m" />
        : (
          <>
            <ViewsIcon className={cls.icon}/>
            <animated.div className={cls.numbers}>
              {
                anime.points.to((value) => formatNumberWithSpaces(Math.trunc(value)))
              }
            </animated.div>
          </>
        )}
    </Text>
  );
};
