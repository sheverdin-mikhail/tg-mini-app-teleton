import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { getUserCurrentLevel, getUserCurrentConditions } from 'entities/User';
import cls from './UpLevelConditionsList.module.scss';
import { ConditionItem } from '../ConditionItem/ConditionItem';

interface UpLevelConditionsListProps {
    className?: string;
}

export const UpLevelConditionsList: React.FC<UpLevelConditionsListProps> = (props) => {
  const { className } = props;
  const currentLevel = useSelector(getUserCurrentLevel);
  const currentConditions = useSelector(getUserCurrentConditions);

  return (
    <div className={clsx(cls.upLevelConditionsList, {}, [className])}>
      <ConditionItem curValue={currentConditions.totalPoints} needValue={currentLevel?.pointToNextLevel ?? 0} description="Набрано очков" />
      <ConditionItem curValue={currentConditions.referrals?.length} needValue={currentLevel?.referralsToNextLevel ?? 0} description="Приглашено друзей" />
      <ConditionItem curValue={currentConditions.dailyRewardStreak ?? 0} needValue={5} description="Собрано ежедневных наград" />
      <ConditionItem curValue={currentConditions.complitedDailyTasksCount ?? 0} needValue={currentLevel?.tasksToNextLevel ?? 0} description="Выполнено ежедневных заданий" />
    </div>
  );
};
