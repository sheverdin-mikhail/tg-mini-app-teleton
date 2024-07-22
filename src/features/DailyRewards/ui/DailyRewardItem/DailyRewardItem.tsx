import { DailyReward } from 'entities/DailyReward';
import clsx from 'clsx';
import { InlineButtonsItem } from '@telegram-apps/telegram-ui/dist/components/Blocks/InlineButtons/components/InlineButtonsItem/InlineButtonsItem';
import { Spinner, Text } from '@telegram-apps/telegram-ui';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserAvailableToClaimDailyRewardDate, getUserLastDailyRewardClaimDate } from 'entities/User';
import moment from 'moment';
import cls from './DailyRewardItem.module.scss';
import { useClaimDailyRewards } from '../../api/dailyRewardsApi';

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

  const [isAvailabelToClaim, setIsAvailabelToClaim] = useState(false);
  const userLastDailyRewardDate = useSelector(getUserLastDailyRewardClaimDate);
  const userAvailableToClaimDailyRewardDate = useSelector(getUserAvailableToClaimDailyRewardDate);
  const [claimDailyRewardMutation, { isLoading }] = useClaimDailyRewards();

  const onClaimRewardHandler = useCallback(() => {
    claimDailyRewardMutation({ id: reward.id });
  }, [reward, claimDailyRewardMutation]);

  useEffect(() => {
    if (userLastDailyRewardDate) {
      const lastClaimDate = moment(userLastDailyRewardDate);
      const availableToClaimDate = moment(userAvailableToClaimDailyRewardDate);
      const isToday = lastClaimDate.isSame(availableToClaimDate, 'day');
      setIsAvailabelToClaim(!isToday);
    } else {
      setIsAvailabelToClaim(true);
    }
  }, [userLastDailyRewardDate, userAvailableToClaimDailyRewardDate]);

  return (
    <InlineButtonsItem
      onClick={onClaimRewardHandler}
      className={clsx(cls.dailyRewardItem, {}, [className])}
      text={`day ${reward.order}`}
      mode={(isAvailabelToClaim || claimed) ? 'bezeled' : 'gray'}
      disabled={disabled || claimed || !isAvailabelToClaim}
    >
      {
        isLoading
          ? <Spinner size="m" />
          : <Text weight="1">{reward.value}</Text>
      }
    </InlineButtonsItem>
  );
};
