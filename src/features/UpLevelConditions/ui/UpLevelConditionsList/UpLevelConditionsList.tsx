import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { getUserCurrentLevel, getUserCurrentConditions } from '@/entities/User';
import cls from './UpLevelConditionsList.module.scss';
import { ConditionItem } from '../ConditionItem/ConditionItem';
import { getLevels } from '@/entities/Level';

interface UpLevelConditionsListProps {
    className?: string;
}

const LEVELS = [
  'Beginner',
  'Advanced',
  'Streamer',
]

export const UpLevelConditionsList: React.FC<UpLevelConditionsListProps> = (props) => {
  const { className } = props;
  const currentLevel = useSelector(getUserCurrentLevel);
  const currentConditions = useSelector(getUserCurrentConditions);
  const levels = useSelector(getLevels);

  return (
    <div className={clsx(cls.upLevelConditionsList, {}, [className])}>
      {
        levels.map((level) => (
          <ConditionItem 
          curValue={Math.trunc(currentConditions.totalPoints)} 
          levelName={
            LEVELS[level.level - 1]
          } 
          level={level}
          passed={(currentLevel?.level ?? 0) > level.level} 
          unavailable={(currentLevel?.level ?? 0) < level.level}
        />
        ))
      }
    </div>
  );
};
