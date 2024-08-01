import clsx from 'clsx';
import { InlineButtons, Title } from '@telegram-apps/telegram-ui';
import { useSelector } from 'react-redux';
import { getUserAvailableToClaimDailyRewardDate, getUserCurrentDailyReward } from '@/entities/User';
import { useEffect, useMemo, useState } from 'react';
import { DailyReward } from '@/entities/DailyReward';
// import moment from 'moment';
import cls from './DailyRewards.module.scss';
import { DailyRewardItem } from '../DailyRewardItem/DailyRewardItem';
import { useGetDailyRewardsList } from '../../api/dailyRewardsApi';
import { DailyRewardsSkeleton } from '../DailyRewardsSkeleton/DailyRewardsSkeleton';
import { TimeProps, Timer } from '@/shared/ui/Timer/Timer';
import { getDateTime } from '@/shared/utils/getUTCDateTime';
import moment from 'moment';

interface DailyRewardsProps {
    className?: string;
}

export const DailyRewards: React.FC<DailyRewardsProps> = (props) => {
  const { className } = props;
  const { isError, isLoading, data: dailyRewardsList } = useGetDailyRewardsList();
  const [time, setTime] = useState<TimeProps>();
  // const userLastDailyRewardDate = useSelector(getUserLastDailyRewardClaimDate);
  const userAvailableToClaimDailyRewardDate = useSelector(getUserAvailableToClaimDailyRewardDate);
  const lastDailyReward = useSelector(getUserCurrentDailyReward);


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

  useEffect(() => {
    const getDailyTime = async () => {
      const now = moment(await getDateTime()) // Текущее время в формате UTC
      const rewardTime = moment(userAvailableToClaimDailyRewardDate); // Время, когда пользователь сможет получить награду

      const duration = moment.duration(rewardTime.diff(now));

      const hours = Math.floor(duration.asHours());
      const minutes = duration.minutes();
      const seconds = duration.seconds();

      console.log(now)
      console.log(rewardTime)

      setTime({
        hours,
        minutes,
        seconds
      });
    }

    getDailyTime();
  }, [userAvailableToClaimDailyRewardDate]);

  if (isError) {
    return <div>Неудалось загрузить ежедневные награды</div>;
  }

  if (!dailyRewards && !isError && !isLoading) {
    return <div>Список ежедневных наград пуст</div>;
  }

  return (
    <div className={cls.dailyRewards}>
      <Title caps weight="2" className={cls.title}>Daily Rewards</Title>
      {
        time && <Timer className={cls.timer} time={time} />
      }
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
