import clsx from 'clsx';
import { InlineButtons, Title } from '@telegram-apps/telegram-ui';
import { useSelector } from 'react-redux';
import { getUserCurrentDailyReward } from 'entities/User';
import { useMemo } from 'react';
import { DailyReward } from 'entities/DailyReward';
import cls from './DailyRewards.module.scss';
import { DailyRewardItem } from '../DailyRewardItem/DailyRewardItem';
import { useGetDailyRewardsList } from '../../api/dailyRewardsApi';
import { DailyRewardsSkeleton } from '../DailyRewardsSkeleton/DailyRewardsSkeleton';

interface DailyRewardsProps {
    className?: string;
}

export const DailyRewards: React.FC<DailyRewardsProps> = (props) => {
  const { className } = props;
  const { isError, isLoading, data: dailyRewards } = useGetDailyRewardsList();
  const lastDailyReward = useSelector(getUserCurrentDailyReward);

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
              dailyRewards.map((reward) => (
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
