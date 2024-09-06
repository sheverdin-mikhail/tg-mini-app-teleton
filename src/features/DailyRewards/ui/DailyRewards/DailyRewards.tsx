import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { useMemo  } from 'react';
import { DailyReward } from '@/entities/DailyReward';
import { DailyRewardItem } from '../DailyRewardItem/DailyRewardItem';
import { useGetDailyRewardsList } from '../../api/dailyRewardsApi';
import { DailyRewardsSkeleton } from '../DailyRewardsSkeleton/DailyRewardsSkeleton';
import { FontSize, Text, TextColor } from '@/shared/ui/Text/Text';
import { useCallback, useEffect, useState } from 'react';
import { getUserAvailableToClaimDailyRewardDate, getUserCurrentDailyReward, getUserLastDailyRewardClaimDate } from '@/entities/User';
import moment from 'moment';
import { useClaimDailyRewards } from '../../api/dailyRewardsApi';
import cls from './DailyRewards.module.scss';
import { Button } from '@/shared/ui/Button/Button';




interface DailyRewardsProps {
  className?: string;
}

export const DailyRewards: React.FC<DailyRewardsProps> = (props) => {
  const { className } = props;
  const { isError, isLoading: listIsLoading, data: dailyRewardsList } = useGetDailyRewardsList(null, {
    refetchOnReconnect: true,
  });

  const dailyRewards = useMemo(() => {
    if (dailyRewardsList) {
      // Создаем копию массива перед сортировкой
      return [...dailyRewardsList].sort((a, b) => a.order - b.order);
    }
    return null;
  }, [dailyRewardsList]);
  const lastDailyReward = useSelector(getUserCurrentDailyReward);
  const currentDailyReward = useMemo<DailyReward | undefined>(() => {
    if (!lastDailyReward) { 
      return dailyRewards?.[0]
    }
    return dailyRewards?.find((reward) => ((lastDailyReward?.order ?? 1) + 1) === reward.order);
  }, [lastDailyReward, dailyRewards]);

  const [isAvailabelToClaim, setIsAvailabelToClaim] = useState(false);
  const userLastDailyRewardDate = useSelector(getUserLastDailyRewardClaimDate);
  const userAvailableToClaimDailyRewardDate = useSelector(getUserAvailableToClaimDailyRewardDate);
  const userCurrentReward = useSelector(getUserCurrentDailyReward);
  const [claimDailyRewardMutation, { isLoading }] = useClaimDailyRewards();

  const onClaimRewardHandler = useCallback(() => {
    claimDailyRewardMutation({ id: currentDailyReward?.id });
  }, [currentDailyReward, claimDailyRewardMutation]);

  useEffect(() => {
   const checkClaimAvailable = async () => {
    if (userLastDailyRewardDate) {
      const today = moment();
      // Получаем текущее время и дату доступности для получения награды
        const availableToClaimDate = moment(userAvailableToClaimDailyRewardDate);
  
        // Проверяем, является ли дата доступности для получения награды сегодняшним днем или более поздней датой
        const isAvailableToday = today?.isSameOrAfter(availableToClaimDate);  
        setIsAvailabelToClaim(isAvailableToday ?? false);
      } else {
      // Если дата последнего получения награды отсутствует, делаем награду доступной
        setIsAvailabelToClaim(true);
      }
   } 

   checkClaimAvailable()
  }, [userLastDailyRewardDate, userAvailableToClaimDailyRewardDate, currentDailyReward?.order, userCurrentReward?.order]);



  if (isError) {
    return <Text>Error! Can't load Daily rewards list, check your connection.</Text>;
  }

  if (!dailyRewards && !isError && !listIsLoading) {
    return <div>Daily rewards list is empty</div>;
  }

  return (
    <div className={cls.dailyRewards}>
      <Text color={TextColor.SECONDARY} size={FontSize.LG} className={cls.title}>Daily Rewards</Text>
      <div className={clsx(cls.dailyRewardItems, {}, [className])}>
        {
          listIsLoading
            ? <DailyRewardsSkeleton />
            : (
              dailyRewards?.map((reward) => (
                <DailyRewardItem
                  key={reward.id}
                  reward={reward}
                  disabled={
                    (reward.order > Number(currentDailyReward?.order))
                  }
                  claimed={reward.order <= Number(lastDailyReward?.order)}
                  isAvailable={isAvailabelToClaim}
                />
              ))
            )
        }
      </div>

      <Button className={cls.button} disabled={!isAvailabelToClaim || isLoading} onClick={onClaimRewardHandler} loading={isLoading}>
        {
          isAvailabelToClaim
          ? 'Take'
          : 'Come back tomorrow'
        }
      </Button>
    </div>
  );
};
