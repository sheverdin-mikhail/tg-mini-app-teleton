import { DailyReward } from 'entities/DailyReward';
import clsx from 'clsx';
import { InlineButtonsItem } from '@telegram-apps/telegram-ui/dist/components/Blocks/InlineButtons/components/InlineButtonsItem/InlineButtonsItem';
import { Spinner, Text } from '@telegram-apps/telegram-ui';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserAvailableToClaimDailyRewardDate, getUserCurrentDailyReward, getUserLastDailyRewardClaimDate } from 'entities/User';
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
  const userCurrentReward = useSelector(getUserCurrentDailyReward);
  const [claimDailyRewardMutation, { isLoading }] = useClaimDailyRewards();

  const onClaimRewardHandler = useCallback(() => {
    claimDailyRewardMutation({ id: reward.id });
  }, [reward, claimDailyRewardMutation]);

  useEffect(() => {
    if (userLastDailyRewardDate) {
    // Получаем текущее время и дату доступности для получения награды
      const today = moment();
      const availableToClaimDate = moment(userAvailableToClaimDailyRewardDate);

      // Проверяем, является ли дата доступности для получения награды сегодняшним днем или более поздней датой
      const isAvailableToday = availableToClaimDate.isSameOrBefore(today);

      // Определяем, доступна ли награда для получения
      const isRewardAvailable = isAvailableToday && (Number(userCurrentReward?.order ?? 0) + 1 === reward.order);
      setIsAvailabelToClaim(isRewardAvailable);
    } else {
    // Если дата последнего получения награды отсутствует, делаем награду доступной
      setIsAvailabelToClaim(true);
    }
  }, [userLastDailyRewardDate, userAvailableToClaimDailyRewardDate, reward.order, userCurrentReward?.order]);

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
