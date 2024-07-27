import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { getUserCurrentLevel, getUserCurrentConditions } from '@/entities/User';
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
      <ConditionItem curValue={Math.trunc(currentConditions.totalPoints)} needValue={currentLevel?.pointToNextLevel ?? 0} description="Набрано очков" />
    </div>
  );
};
