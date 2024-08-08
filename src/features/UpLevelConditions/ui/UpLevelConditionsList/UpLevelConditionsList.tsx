import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { getUserCurrentLevel, getUserCurrentConditions } from '@/entities/User';
import cls from './UpLevelConditionsList.module.scss';
import { ConditionItem } from '../ConditionItem/ConditionItem';
import { getLevels, getLevelsIsError } from '@/entities/Level';
import { Text } from '@telegram-apps/telegram-ui';

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
  const isError = useSelector(getLevelsIsError)

  if (isError) {
    return <Text>
      Error! Can't load levels, check your connection.
    </Text>
  }

  return (
    <div className={clsx(cls.upLevelConditionsList, {}, [className])}>
      {
        levels.map((level, index) => (
          <ConditionItem 
          curValue={Math.trunc(currentConditions.totalPoints)} 
          levelName={
            LEVELS[level.level - 1]
          } 
          level={level}
          pointsToNextLevel={levels[index-1]?.pointToNextLevel}
          passed={(currentLevel?.level ?? 0) > level.level} 
          unavailable={(currentLevel?.level ?? 0) < level.level}
        />
        ))
      }
    </div>
  );
};
