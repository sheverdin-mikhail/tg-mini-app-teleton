import clsx from 'clsx';
import cls from './LootboxDetailContent.module.scss';
import { LootBoxReward, LootboxType } from '@/entities/LootBox';
import { useCallback, useMemo } from 'react';
import { formatNumber } from '@/shared/lib/utils/formatNumber';
import { ViewsIcon } from '@/shared/ui/ViewsIcon/ViewsIcon';
import { FontSize, FontWeight, Text, TextColor } from '@/shared/ui/Text/Text';
import { Card } from '@/shared/ui/Card/Card';
import { Boost, BoostIcon, BoostType, useGetBoostsList } from '@/entities/Boost';
import { Button } from '@/shared/ui/Button/Button';
import { useBuyLootBox } from '@/features/LootBox/api/lootBoxApi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserTotalPoins } from '@/entities/User';

interface LootboxDetailContentProps {
    className?: string;
    rewards?: LootBoxReward[];
    price?: number;
    lootboxId: string;
    count: number;
}



export const LootboxDetailContent: React.FC<LootboxDetailContentProps> = (props) => {
    const { className, rewards: rewardsData, price, lootboxId, count } = props;
    const {data: boostsList} = useGetBoostsList();
    const [buyLootBoxMutation, {isLoading}] = useBuyLootBox();
    const navigate = useNavigate()
    const totalPoints = useSelector(getUserTotalPoins)

    const getBoost = useCallback((boostId: Boost['id']) => {
        return boostsList?.find(boost => boost.id === boostId)
    }, [boostsList])

    const rewards = useMemo(() => {
        return rewardsData?.reduce<Record<LootboxType, LootBoxReward[]>>((acc, cur) => {
            const { type } = cur
            if (!acc[type]) {
                acc[type] = []

            } 
            acc[type].push(cur)
            return acc
        }, {
            [LootboxType.POINTS]: [],
            [LootboxType.BOOST]: [],
        })
    }, [rewardsData])

    const onBuyClickHandler = useCallback(() => {
        buyLootBoxMutation({
            count,
            id: lootboxId
        })
        navigate(-1)
    }, [])


    return (
        <div className={clsx(cls.lootboxDetailContent, {}, [className])}>
            <div className={cls.block}>
                <Text size={FontSize.LG} color={TextColor.SECONDARY} >Views</Text>
                <div className={cls.poitnsList}>
                    {rewards?.points.sort((a,b) => (a.settings.amount ?? 0) - (b.settings.amount ?? 0)).map((reward) => (
                        <div key={reward.id} className={cls.pointsCard}><ViewsIcon />&nbsp;<Text size={FontSize.LG} weight={FontWeight.MEDIUM}>{formatNumber(reward.settings.amount?.toString() ?? '0')}</Text> </div>
                    ))}
                </div>
            </div>

            <div className={cls.block}>
                <Text size={FontSize.LG} color={TextColor.SECONDARY} >Boosts</Text>
                <div className={cls.boostsList}>
                    {rewards?.boost.map((reward: any) => {
                        const boost = getBoost(reward.settings.boostId);
                        return (
                            <Card className={cls.boostCard} key={reward.id}> 
                                <img src={BoostIcon[boost?.type ?? BoostType.ENERGY]} className={cls.boostImage} />
                                <div className={cls.col}>
                                    <Text weight={FontWeight.MEDIUM}>{boost?.title}</Text>
                                    <Text>{boost?.description}</Text>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            </div>
            <Button className={cls.button} onClick={onBuyClickHandler} loading={isLoading} disabled={(totalPoints < (price ?? 0)) || isLoading}>
                Open for {formatNumber(price?.toString() ?? '0')}&nbsp;<ViewsIcon className={cls.viewsIcon} />
            </Button>
        </div>
    );
}