import { LootBox, LootBoxReward } from '@/entities/LootBox';
import cls from './LootBoxItem.module.scss';
import LootBoxImage from '@/shared/assets/img/lootbox.png';

import clsx from 'clsx';
import { useBuyLootBox } from '../../api/lootBoxApi';
import { useCallback } from 'react';
import { ViewsIcon } from '@/shared/ui/ViewsIcon/ViewsIcon';
import { useSelector } from 'react-redux';
import { getUserTotalPoins } from '@/entities/User';
import { FontSize, FontWeight, Text } from '@/shared/ui/Text/Text';
import { Button } from '@/shared/ui/Button/Button';
import { formatNumber } from '@/shared/lib/utils/formatNumber';
import ArrowIcon from '@/shared/assets/icons/long-arrow-right.svg';
import { Icon } from '@/shared/ui/Icon/Icon';
import { useNavigate } from 'react-router-dom';

interface LootBoxItemProps {
    className?: string;
    lootBox: LootBox;
    price: number;
    count: number;
    rewards?: LootBoxReward[];
}

export const LootBoxItem: React.FC<LootBoxItemProps> = (props) => {
    const { className, price, lootBox, count } = props;
    const [buyLootBoxMutation, {isLoading}] = useBuyLootBox();
    const totalPoints = useSelector(getUserTotalPoins)
    const navigate = useNavigate();


    const onBuyClickHandler = useCallback(() => {
        buyLootBoxMutation({
            count,
            id: lootBox.id
        })
    }, [])


    return (
        <div className={clsx(cls.lootBoxItem, {}, [className])}>
            <button className={cls.link} onClick={() => navigate(`/lootbox/${lootBox.id}/${count}`)}>
                <Text size={FontSize.SM} weight={FontWeight.MEDIUM} className={cls.detailLink}>What's inside? <Icon Svg={ArrowIcon}  className={cls.arrow} /></Text>
            </button>
            <div className={cls.lootBoxIcons}>
                {
                    [...Array(count)].map((id, index) => (
                        <img src={LootBoxImage} className={cls.lootBoxIcon} key={`${id}_${index}`}/>
                    ))
                }
            </div>
            <Text className={cls.title} weight={FontWeight.BOLD}>
                Open loot boxes and win bonuses!
            </Text>
            <Button className={cls.button} onClick={onBuyClickHandler} disabled={totalPoints < price || isLoading} loading={isLoading}>
                <span className={cls.buttonText}><ViewsIcon className={cls.viewsIcon} /> Open for { formatNumber(price.toString()) }</span>
            </Button>
        </div>
    );
}