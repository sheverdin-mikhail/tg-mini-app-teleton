import { DailyReward } from 'entities/DailyReward';
import clsx from 'clsx';
import { InlineButtonsItem } from '@telegram-apps/telegram-ui/dist/components/Blocks/InlineButtons/components/InlineButtonsItem/InlineButtonsItem';
import { Text } from '@telegram-apps/telegram-ui';
import { useCallback } from 'react';
import cls from './DailyRewardItem.module.scss';

interface DailyRewardItemProps {
  className?: string;
  reward: DailyReward;
  disabled?: boolean;
  claimed?: boolean;
}

export const DailyRewardItem: React.FC<DailyRewardItemProps> = (props) => {
  const {
    className, reward, disabled = false, claimed = false,
  } = props;

  const onClaimRewardHandler = useCallback(() => {
    console.log('claimed: ', reward.value);
  }, []);

  return (
    <InlineButtonsItem
      onClick={onClaimRewardHandler}
      className={clsx(cls.dailyRewardItem, {}, [className])}
      text={`day ${reward.order}`}
      mode={claimed || !disabled ? 'bezeled' : 'gray'}
      disabled={disabled || claimed}
    >
      <Text weight="1">{reward.value}</Text>
    </InlineButtonsItem>
  );
};
