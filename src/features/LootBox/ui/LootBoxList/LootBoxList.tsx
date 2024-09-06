import clsx from 'clsx';
import cls from './LootBoxList.module.scss';
import { LootBoxItem } from '../LootBoxItem/LootBoxItem';
import { useGetLootBoxList } from '../../api/lootBoxApi';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { lootBoxActions, lootBoxReducer } from '../../model/slice/lootBox';
import { useEffect } from 'react';
import { LOOTBOX_REWARDS_LOCALSTORAGE } from '@/shared/const/localStorage';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { LootBoxClaimModal } from '../LootBoxClaimModal/ui/LootBoxClaimModal/LootBoxClaimModal';
import { FontSize, Text, TextColor } from '@/shared/ui/Text/Text';

interface LootBoxListProps {
    className?: string;
}

const reducers: ReducersList = {
    lootBox: lootBoxReducer,
}

export const LootBoxList: React.FC<LootBoxListProps> = (props) => {
    const { className } = props;
    const {data: lootBoxList, isError } = useGetLootBoxList()
    const dispatch = useAppDispatch();

    useEffect(() => {
        const lootBoxRewardsSting: 'undefined' | string | null = localStorage.getItem(LOOTBOX_REWARDS_LOCALSTORAGE)
        const lootBoxRewards = lootBoxRewardsSting !== 'undefined' ? JSON.parse(lootBoxRewardsSting ?? '0') : null

        if (lootBoxRewards) {
            dispatch(lootBoxActions.openModal(lootBoxRewards))
        } else {
            localStorage.removeItem(LOOTBOX_REWARDS_LOCALSTORAGE)
        }
    }, [])


    if (isError) {
        return <>
            <Text color={TextColor.SECONDARY} size={FontSize.LG}>
                Loot boxes
            </Text>
            <Text >Error! Can't load Lootboxes list, check your connection.</Text>
        </>
    }

    if (!lootBoxList?.length) {
        return <>
            <Text color={TextColor.SECONDARY} size={FontSize.LG}>
                Loot boxes
            </Text>
            <Text >Lootboxes list is empty</Text>
        </>
    }
    

    return (
    <DynamicModuleLoader reducers={reducers}>
        <div className={clsx(cls.lootBoxList, {}, [className])}>
            <Text color={TextColor.SECONDARY} size={FontSize.LG}>
                Loot boxes
            </Text>
            <div className={cls.items}>
                {
                    lootBoxList?.map((lootBox) => (
                        lootBox.prices.map((price, index) => (
                            <LootBoxItem price={price} count={index+1} lootBox={lootBox} rewards={lootBox.lootBoxRewards} key={`${lootBox.id}_${price}`}/>
                        ))
                    ))
                }
                
            </div>
        </div>
        <LootBoxClaimModal />
    </DynamicModuleLoader>

    );
}