import { LootBox, LootBoxReward } from '@/entities/LootBox';
import cls from './LootBoxItem.module.scss';
import LootBoxImage from '@/shared/assets/img/lootbox.png';

import clsx from 'clsx';
import { Button, Text, Title } from '@telegram-apps/telegram-ui';
import { useBuyLootBox } from '../../api/lootBoxApi';
import { useCallback, useState } from 'react';
import { ViewsIcon } from '@/shared/ui/ViewsIcon/ViewsIcon';
import { useSelector } from 'react-redux';
import { getUserTotalPoins } from '@/entities/User';
import { LootBoxRewardsListModal } from '../LootBoxRewardsListModal/LootBoxRewardsListModal';

interface LootBoxItemProps {
    className?: string;
    lootBox: LootBox;
    price: number;
    count: number;
    rewards?: LootBoxReward[];
}

export const LootBoxItem: React.FC<LootBoxItemProps> = (props) => {
    const { className, price, lootBox, count, rewards } = props;
    const [buyLootBoxMutation, {isLoading}] = useBuyLootBox();
    const totalPoints = useSelector(getUserTotalPoins)
    const [lootBoxRewardsListIsOpen, setLootBoxRewardsListIsOpen] = useState(false)


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
            <Title weight='2' className={cls.title}>
                Open loot boxes and win bonuses!
            </Title>
            <Text className={cls.text} onClick={() => setLootBoxRewardsListIsOpen(true)}>
                What's inside?
            </Text>
            <Button className={cls.button} onClick={onBuyClickHandler} disabled={totalPoints < price || isLoading} loading={isLoading}>
                <span className={cls.buttonText}>
                    Open for { price } <ViewsIcon />
                </span>
            </Button>
            {
                rewards?.length && <LootBoxRewardsListModal
                    rewards={rewards} 
                    isOpen={lootBoxRewardsListIsOpen} 
                    setIsOpen={setLootBoxRewardsListIsOpen}
                 />
            }
        </div>
    );
}