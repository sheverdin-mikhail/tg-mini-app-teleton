import clsx from 'clsx';
import { getLevels } from 'entities/Level';
import { getUser } from 'entities/User/model/selectors/userSelector';
import { useSelector } from 'react-redux';
import { CircularProgress } from 'shared/ui/CircularProgress/CircularProgress';
import { HTMLAttributes, useMemo } from 'react';
import { Text } from '@telegram-apps/telegram-ui';
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

    const curReferalsCount = user?.referrals?.length || 0;
    let refrelPercents = curReferalsCount / (curLevel?.referralsToNextLevel ?? 1) * 100;
    if (refrelPercents > 100 || !curLevel?.referralsToNextLevel) {
      refrelPercents = 100;
    }

    const curTasksCount = user.complitedDailyTasksCount || 0;
    let tasksPercents = curTasksCount / (curLevel?.tasksToNextLevel ?? 1) * 100;
    if (tasksPercents > 100) {
      tasksPercents = 100;
    }

    const totalPercents = pointsPercents / 3 + refrelPercents / 3 + tasksPercents / 3;
    return totalPercents;
  }, [user, levels]);

  return (
    <div className={clsx(cls.gameLevelProgress, className)} onClick={(e) => onClick?.(e)} {...otherProps}>
      <Text className={cls.textLevel} caps weight="1">lvl</Text>
      <CircularProgress size="large" progress={progress + 1}>
        <div className={cls.level}>
          <span className={cls.curLevel}>{user.level?.level ?? 1}</span>
          <span className={cls.maxLevel}>{levels.length}</span>
        </div>
      </CircularProgress>
    </div>
  );
};
