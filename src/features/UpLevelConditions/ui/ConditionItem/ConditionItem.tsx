import clsx from 'clsx';
import cls from './ConditionItem.module.scss';
import { Level } from '@/entities/Level';
import LevelImage1 from '@/shared/assets/img/game/level_1.png';
import LevelImage2 from '@/shared/assets/img/game/level_2.png';
import LevelImage3 from '@/shared/assets/img/game/level_3.png';
import { Text, Title } from '@telegram-apps/telegram-ui';
import { useMemo } from 'react';
import { ViewsIcon } from '@/shared/ui/ViewsIcon/ViewsIcon';
import { formatNumber } from '@/shared/lib/utils/formatNumber';


interface ConditionItemProps {
    className?: string;
    passed?: boolean;
    curValue?: number;
    levelName?: string;
    level?: Level;
    unavailable?: boolean;
    pointsToNextLevel?: number;
}

const LevelImages = [
  LevelImage1, LevelImage2, LevelImage3
]

export enum ConditionItemTheme {
  PASSED = 'passed',
  UNAVAILABLE = 'unavailable',
  CURRENT = 'curren'
} 

export const ConditionItem: React.FC<ConditionItemProps> = (props) => {
  const {
    className, 
    curValue = 0, 
    level, 
    levelName, 
    passed,
    unavailable,
    pointsToNextLevel
  } = props;

  const theme = useMemo(() => {
    if (passed) {
      return ConditionItemTheme.PASSED
    }
    else if (unavailable) {
      return ConditionItemTheme.UNAVAILABLE
    }
    else {
      return ConditionItemTheme.CURRENT
    }
  }, [passed, unavailable])

  return (
    <div className={clsx(cls.conditionItem, {}, [className])}>
      <div className={cls.levelBlock}>
        <img className={clsx(cls.img, cls[theme])} src={LevelImages[(level?.level ?? 0) - 1]} alt="" />
        <div className={cls.textBlock}>
          <Text className={cls.levelName}>
            {levelName}
          </Text>
          <Title className={cls.title} >
            {
              passed ? "Location passed" : unavailable ? 'Location unavailable' : 'Current location'
            }
          </Title>
          {
            !passed && (
              <Text>
                  {
                    unavailable 
                    ? (
                      <span className={cls.text}>
                        get {formatNumber(pointsToNextLevel?.toString() ?? '0')} <ViewsIcon className={cls.icon} />
                      </span>
                    )
                    : <span className={cls.text}>
                      {formatNumber(curValue.toString())} <ViewsIcon className={cls.icon} />
                    </span>
                  }
              </Text>
            )
          }
        </div>
      </div>
    </div>
  );
};
