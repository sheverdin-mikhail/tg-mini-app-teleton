import clsx from 'clsx';
import { Progress, Text } from '@telegram-apps/telegram-ui';
import { useMemo } from 'react';
import cls from './ConditionItem.module.scss';

interface ConditionItemProps {
    className?: string;
    curValue?: string | boolean | number;
    needValue?: string | boolean | number;
    description: string;
}

export const ConditionItem: React.FC<ConditionItemProps> = (props) => {
  const {
    className, curValue = 0, needValue = 0, description,
  } = props;

  const percents = useMemo(() => {
    if (!needValue) {
      return 100;
    }

    return +curValue / +needValue * 100;
  }, [curValue, needValue]);

  return (
    <div className={clsx(cls.conditionItem, {}, [className])}>
      <div className={cls.text}>
        <Text className={cls.description} caps weight="1">{description}</Text>
        <Text className={cls.conditions} weight="2">
          <span className={cls.currentValue}>{curValue}</span>
          <span>/</span>
          <span className={cls.needValue}>{needValue}</span>
        </Text>
      </div>
      <Progress value={percents} />
    </div>
  );
};
