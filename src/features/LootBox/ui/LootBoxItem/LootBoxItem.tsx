import { LootBox } from '@/entities/LootBox';
import cls from './LootBoxItem.module.scss';
import LootBoxImage from '@/shared/assets/img/lootbox.png';

import clsx from 'clsx';
import { Button } from '@telegram-apps/telegram-ui';
import { useBuyLootBox } from '../../api/lootBoxApi';
import { useCallback } from 'react';
import { ViewsIcon } from '@/shared/ui/ViewsIcon/ViewsIcon';
import { useSelector } from 'react-redux';
import { getUserTotalPoins } from '@/entities/User';

interface LootBoxItemProps {
    className?: string;
    lootBox: LootBox;
    price: number;
    count: number;
}

export const LootBoxItem: React.FC<LootBoxItemProps> = (props) => {
    const { className, price, lootBox, count } = props;
    const [buyLootBoxMutation] = useBuyLootBox();
    const totalPoints = useSelector(getUserTotalPoins)


    const onBuyClickHandler = useCallback(() => {
        buyLootBoxMutation({
            count,
            id: lootBox.id
        })
    }, [])


    return (
        <div className={clsx(cls.lootBoxItem, {}, [className])}>
            <div className={cls.lootBoxIcons}>
                {
                    [...Array(count)].map((id, index) => (
                        <img src={LootBoxImage} className={cls.lootBoxIcon} key={`${id}_${index}`}/>
                    ))
                }
            </div>
            <Button className={cls.button} onClick={onBuyClickHandler} disabled={totalPoints < price}>
                <span className={cls.buttonText}>
                    Open for { price } <ViewsIcon />
                </span>
            </Button>
        </div>
    );
}