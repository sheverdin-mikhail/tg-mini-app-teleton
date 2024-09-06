import { DailyReward } from '@/entities/DailyReward';
import clsx from 'clsx';
import cls from './DailyRewardItem.module.scss';
import { ViewsIcon } from '@/shared/ui/ViewsIcon/ViewsIcon';
import { FontSize, FontWeight, Text } from '@/shared/ui/Text/Text';
import { formatNumber } from '@/shared/lib/utils/formatNumber';
import { Icon } from '@/shared/ui/Icon/Icon';
import CheckIcon from '@/shared/assets/icons/check-icon.svg'

interface DailyRewardItemProps {
  className?: string;
  reward: DailyReward;
  disabled?: boolean;
  claimed?: boolean;
  isAvailable?: boolean;
}

export const DailyRewardItem: React.FC<DailyRewardItemProps> = (props) => {
  const {
    className, reward, disabled = false, claimed = false, isAvailable = false
  } = props;

  
  return (
    <div
      className={clsx(cls.dailyRewardItem, {
        [cls.disabled]: (!isAvailable || disabled) && !claimed,
        [cls.notAvailable]: !isAvailable && disabled,
      }, [className])}
    >
      <div className={clsx(cls.content, {
        [cls.claimed]: claimed,
      })}>
        {
          claimed 
          ? <span className={cls.check}><Icon Svg={CheckIcon} className={cls.icon}/></span>
          : <Text className={cls.points} size={FontSize.LG} weight={FontWeight.MEDIUM}><ViewsIcon /> {formatNumber(reward.value.toFixed(0))}</Text>
        }
        <Text size={FontSize.SM} weight={FontWeight.MEDIUM}>Day {reward.order}</Text>
      </div>
    </div>
  );
};
