import { Boost, BoostIcon } from '@/entities/Boost';
import clsx from 'clsx';
import { useCallback } from 'react';
import CheckIcon from '@/shared/assets/icons/check-icon.svg';
import { formatNumber } from '@/shared/lib/utils/formatNumber';
import { useBuyBoost } from '@/entities/Boost';
import { ViewsIcon } from '@/shared/ui/ViewsIcon/ViewsIcon';
import { Icon } from '@/shared/ui/Icon/Icon';
import { useSelector } from 'react-redux';
import { getUserTotalPoins } from '@/entities/User';
import { Card } from '@/shared/ui/Card/Card';
import cls from './BoostsListItem.module.scss';
import { FontWeight, Text } from '@/shared/ui/Text/Text';
import { Button, ButtonSize } from '@/shared/ui/Button/Button';

interface BoostsListItemProps {
  className?: string;
  item: Boost;
  alreadyHave?: boolean;
}



export const BoostsListItem: React.FC<BoostsListItemProps> = (props) => {
  const { className, item, alreadyHave } = props;
  const [buyBoostsMudation, { isLoading }] = useBuyBoost();
  const totalPoints = useSelector(getUserTotalPoins)

  const onClickHandler = useCallback(() => {
    buyBoostsMudation(item.id);
  }, [buyBoostsMudation, item.id]);

  return (
    <Card className={clsx(cls.boostsListItem, {}, [className])}>
      <img src={BoostIcon[item.type]} className={cls.boostIcon} />
      <div className={cls.col}>
        <Text className={cls.title} weight={FontWeight.MEDIUM}>{item.title}</Text>
        <Text className={cls.text}>{item.description}</Text>
      </div>
      <Button 
        loading={isLoading} 
        className={cls.button} 
        size={ButtonSize.SMALL} 
        disabled={alreadyHave || isLoading || item.cost > totalPoints} 
        onClick={onClickHandler}
      >
        {
          alreadyHave
            ? <Icon Svg={CheckIcon} className={cls.icon} />
            : <span className={cls.buttonText}><ViewsIcon className={cls.viewsIcon} />{formatNumber(String(item.cost))}</span>
        }
      </Button>
    </Card>
  );
};
