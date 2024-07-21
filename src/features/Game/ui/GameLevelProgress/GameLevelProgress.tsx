import clsx from 'clsx';
import { getLevels } from 'entities/Level';
import { getUser } from 'entities/User/model/selectors/userSelector';
import { useSelector } from 'react-redux';
import { CircularProgress } from 'shared/ui/CircularProgress/CircularProgress';
import { useMemo } from 'react';
import cls from './GameLevelProgress.module.scss';

interface GameLevelProgressProps {
    className?: string;
}

export const GameLevelProgress: React.FC<GameLevelProgressProps> = (props) => {
  const { className } = props;
  const user = useSelector(getUser);
  const levels = useSelector(getLevels);

  const progress = useMemo(() => {
    const curLevel = user.currentLevel ?? levels[0];
    const pointsPercents = user.totalPoints / (curLevel?.pointToNextLevel || 1) * 100;

    const curReferalsCount = user?.referals?.length || 0;
    const refrelPercents = curReferalsCount / (curLevel?.referalsToNextLevel || 1) * 100;

    const curTasksCount = user.complitedDailyTasksCount || 0;
    const tasksPercents = curTasksCount / (curLevel?.tasksToNextLevel || 1) * 100;

    const totalPercents = pointsPercents / 3 + refrelPercents / 3 + tasksPercents / 3;
    return totalPercents;
  }, [user]);

  return (
    <CircularProgress size="large" progress={progress + 1} className={clsx(className)}>
      <div className={cls.gameLevelProgress}>
        <span>{user.currentLevel?.level ?? 1}</span>
        <span>|</span>
        <span>{levels.length}</span>
      </div>
    </CircularProgress>
  );
};
