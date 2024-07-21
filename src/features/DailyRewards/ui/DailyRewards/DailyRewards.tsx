import clsx from 'clsx';
import { DailyReward } from 'entities/DailyReward';
import { InlineButtons, Title } from '@telegram-apps/telegram-ui';
import cls from './DailyRewards.module.scss';
import { DailyRewardItem } from '../DailyRewardItem/DailyRewardItem';

interface DailyRewardsProps {
    className?: string;
}

const dailyRewards: DailyReward[] = [
  {
    order: 1,
    value: 10,
  },
  {
    order: 2,
    value: 100,
  },
  {
    order: 3,
    value: 500,
  },
  {
    order: 4,
    value: 1500,
  },
  {
    order: 5,
    value: 5000,
  },
  {
    order: 6,
    value: 10000,
  },
  {
    order: 7,
    value: 50000,
  },
];

export const DailyRewards: React.FC<DailyRewardsProps> = (props) => {
  const { className } = props;

  return (
    <div className={cls.dailyRewards}>
      <Title caps weight="2" className={cls.title}>Daily Rewards</Title>
      <InlineButtons className={clsx(cls.dailyRewardItems, {}, [className])}>
        {
          dailyRewards.map((reward) => (
            <DailyRewardItem key={reward.order} reward={reward} disabled={reward.order > 3} claimed={reward.order < 3} />
          ))
        }
      </InlineButtons>
    </div>
  );
};
