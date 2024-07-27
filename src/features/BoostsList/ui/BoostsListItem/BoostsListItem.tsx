import { Boost } from '@/entities/Boost';
import clsx from 'clsx';
import {
  Button, Text, Title,
} from '@telegram-apps/telegram-ui';
import { useCallback } from 'react';
import ViewsIcon from '@/shared/assets/icons/views-icon.svg';
import CheckIcon from '@/shared/assets/icons/check-icon.svg';
import { formatNumber } from '@/shared/lib/utils/formatNumber';
import cls from './BoostsListItem.module.scss';
import { useBuyBoost } from '../../api/boostsListApi';

interface BoostsListItemProps {
  className?: string;
  item: Boost;
  alreadyHave?: boolean;
}

export const BoostsListItem: React.FC<BoostsListItemProps> = (props) => {
  const { className, item, alreadyHave } = props;
  const [buyBoostsMudation, { isLoading }] = useBuyBoost();

  const onClickHandler = useCallback(() => {
    buyBoostsMudation({ id: item.id });
  }, [buyBoostsMudation, item.id]);

  return (
    <div className={clsx(cls.boostsListItem, {}, [className])}>
      <div className={cls.text}>
        <Title className={cls.title}>{item.title}</Title>
        <Text className={cls.text}>{item.description}</Text>
      </div>
      <Button loading={isLoading} className={cls.button} size="m" disabled={alreadyHave || isLoading} onClick={onClickHandler}>
        {
          alreadyHave
            ? <CheckIcon className={cls.icon} />
            : <span className={cls.buttonText}><ViewsIcon className={cls.icon} />{formatNumber(String(item.cost))}</span>
        }
      </Button>
    </div>
  );
};
