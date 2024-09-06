import clsx from 'clsx';
import { getLevels } from '@/entities/Level';
import { getUser } from '@/entities/User/model/selectors/userSelector';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@/shared/ui/CircularProgress/CircularProgress';
import { HTMLAttributes, useMemo } from 'react';
import { FontWeight, Text } from '@/shared/ui/Text/Text';
import cls from './GameLevelProgress.module.scss';

interface GameLevelProgressProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const GameLevelProgress: React.FC<GameLevelProgressProps> = (props) => {
  const { className, onClick, ...otherProps } = props;
  const user = useSelector(getUser);
  const levels = useSelector(getLevels);

  const progress = useMemo(() => {
    const curLevel = user.level ?? levels[0];
    let pointsPercents = user.totalPoints / (curLevel?.pointToNextLevel || 1) * 100;
    if (pointsPercents > 100) {
      pointsPercents = 100;
    }

    const totalPercents = pointsPercents;
    return totalPercents;
  }, [user, levels]);

  return (
    <div className={clsx(cls.gameLevelProgress, className)} onClick={(e) => onClick?.(e)} {...otherProps}>
      <CircularProgress size="large" progress={progress + 1}>
        <div className={cls.level}>
          <Text className={cls.curLevel}>{user.level?.level ?? 1}</Text>
        </div>
      </CircularProgress>
      <Text weight={FontWeight.BOLD} ><span className={cls.textLevel} >Location</span></Text>
    </div>
  );
};
