import clsx from 'clsx';
import { InlineButtons, Title } from '@telegram-apps/telegram-ui';
import { useSelector } from 'react-redux';
import { getUserCurrentDailyReward } from '@/entities/User';
import { useMemo } from 'react';
import { DailyReward } from '@/entities/DailyReward';
// import moment from 'moment';
import cls from './DailyRewards.module.scss';
import { DailyRewardItem } from '../DailyRewardItem/DailyRewardItem';
import { useGetDailyRewardsList } from '../../api/dailyRewardsApi';
import { DailyRewardsSkeleton } from '../DailyRewardsSkeleton/DailyRewardsSkeleton';

interface DailyRewardsProps {
    className?: string;
}

export const DailyRewards: React.FC<DailyRewardsProps> = (props) => {
  const { className } = props;
  const { isError, isLoading, data: dailyRewardsList } = useGetDailyRewardsList();
  // const userLastDailyRewardDate = useSelector(getUserLastDailyRewardClaimDate);
  // const userAvailableToClaimDailyRewardDate = useSelector(getUserAvailableToClaimDailyRewardDate);
  const lastDailyReward = useSelector(getUserCurrentDailyReward);

  // useEffect(() => {
  //   const now = moment();
  //   const availableToClaimDate = moment(userAvailableToClaimDailyRewardDate);
  //   const diffInMilliseconds = availableToClaimDate.diff(now);
  //   const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  //   const hours = String(Math.floor(diffInMinutes / 60)).padStart(2, '0');
  //   const minutes = String(diffInMinutes % 60).padStart(2, '0');
  //   const timeUntilAvailable = `${hours}:${minutes}`;
  // }, [userAvailableToClaimDailyRewardDate]);

  const dailyRewards = useMemo(() => {
    if (dailyRewardsList) {
      // Создаем копию массива перед сортировкой
      return [...dailyRewardsList].sort((a, b) => a.order - b.order);
    }
    return null;
  }, [dailyRewardsList]);

  const currentDailyReward = useMemo<DailyReward>(() => {
    if (!lastDailyReward) {
      return {
        order: 0,
        value: 0,
      };
    }
    return lastDailyReward;
  }, [lastDailyReward]);

  if (isError) {
    return <div>Неудалось загрузить ежедневные награды</div>;
  }

  if (!dailyRewards && !isError && !isLoading) {
    return <div>Список ежедневных наград пуст</div>;
  }

  return (
    <div className={cls.dailyRewards}>
      <Title caps weight="2" className={cls.title}>Daily Rewards</Title>
      {/* @ts-ignore */}
      <InlineButtons className={clsx(cls.dailyRewardItems, {}, [className])}>
        {
          isLoading
            ? <DailyRewardsSkeleton />
            : (
              dailyRewards?.map((reward) => (
                <DailyRewardItem
                  key={reward.id}
                  reward={reward}
                  disabled={
                    (reward.order > (Number(currentDailyReward?.order) + 1))
                  }
                  claimed={reward.order <= Number(currentDailyReward?.order)}
                />
              ))
            )
        }
      </InlineButtons>
    </div>
  );
};
