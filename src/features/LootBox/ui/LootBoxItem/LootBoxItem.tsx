import { LootBox } from '@/entities/LootBox';
import cls from './LootBoxItem.module.scss';
import LootBoxIcon from '@/shared/assets/icons/lootbox-icon.svg';
import ViewsIcon from '@/shared/assets/icons/views-icon.svg';

import clsx from 'clsx';
import { Button } from '@telegram-apps/telegram-ui';
import { useBuyLootBox } from '../../api/lootBoxApi';
import { useCallback } from 'react';

interface LootBoxItemProps {
    className?: string;
    lootBox: LootBox;
    price: number;
    count: number;
}

export const LootBoxItem: React.FC<LootBoxItemProps> = (props) => {
    const { className, price, lootBox, count } = props;
    const [buyLootBoxMutation] = useBuyLootBox();


    const onBuyClickHandler = useCallback(() => {
        buyLootBoxMutation({
            count,
            id: lootBox.id
        })
    }, [])

    return (
        <div className={clsx(cls.lootBoxItem, {}, [className])}>
            <LootBoxIcon className={cls.icon}/>
            <Button className={cls.button} onClick={onBuyClickHandler}>
                <span className={cls.buttonText}>
                    <ViewsIcon className={cls.viewsIcon}/>
                    { price }
                </span>
            </Button>
        </div>
    );
}