import { Card } from '@/shared/ui/Card/Card';
import DailyRewardIcon from '@/shared/assets/img/daily-reward.png';
import ArrowRight from '@/shared/assets/icons/arrow-right-icon.svg';
import { FontSize, FontWeight, Text } from '@/shared/ui/Text/Text';
import { ViewsIcon } from '@/shared/ui/ViewsIcon/ViewsIcon';
import { Icon } from '@/shared/ui/Icon/Icon';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserCurrentDailyReward } from '@/entities/User';
import { DailyReward } from '@/entities/DailyReward';
import { useMemo } from 'react';
import cls from './DailyRewardCard.module.scss';
import { useGetDailyRewardsList } from '../../api/dailyRewardsApi';
import clsx from 'clsx';
import { formatNumber } from '@/shared/lib/utils/formatNumber';

interface DailyRewardCardProps {
    className?: string;
}

export const DailyRewardCard: React.FC<DailyRewardCardProps> = (props) => {
    const { className } = props;

    const { data: dailyRewardsList, isLoading } = useGetDailyRewardsList(null, {
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
          return {
            order: 0,
            value: 0,
          };
        }
        return dailyRewards?.find((reward) => ((lastDailyReward?.order ?? 1) + 1) === reward.order);
      }, [lastDailyReward, dailyRewards]);

    const navigate = useNavigate();

    return (
        <Card className={clsx(cls.dailyRewardCard, className)} onClick={() => navigate('/daily')} loading={isLoading}>
          <img src={DailyRewardIcon} className={cls.dailyRewardIcon} />
          <div className={cls.block}>
            <Text>Your daily reward</Text>
            <Text className={cls.points} size={FontSize.LG} weight={FontWeight.MEDIUM}><ViewsIcon/>&nbsp;{formatNumber(currentDailyReward?.value?.toString() ?? '0')}</Text>
          </div>
          <Icon Svg={ArrowRight} className={cls.arrow}/>
        </Card>
    );
}