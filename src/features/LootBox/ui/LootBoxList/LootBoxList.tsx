import clsx from 'clsx';
import cls from './LootBoxList.module.scss';
import { Text, Title } from '@telegram-apps/telegram-ui';
import { LootBoxItem } from '../LootBoxItem/LootBoxItem';
import { useGetLootBoxList } from '../../api/lootBoxApi';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { lootBoxActions, lootBoxReducer } from '../../model/slice/lootBox';
import { useEffect } from 'react';
import { LOOTBOX_REWARDS_LOCALSTORAGE } from '@/shared/const/localStorage';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { LootBoxReward } from '@/entities/LootBox';
import { LootBoxClaimModal } from '../LootBoxClaimModal/ui/LootBoxClaimModal/LootBoxClaimModal';

interface LootBoxListProps {
    className?: string;
}

const reducers: ReducersList = {
    lootBox: lootBoxReducer,
}

export const LootBoxList: React.FC<LootBoxListProps> = (props) => {
    const { className } = props;
    const {data: lootBoxList, isLoading, isError, error } = useGetLootBoxList()
    const dispatch = useAppDispatch();

    useEffect(() => {
        const lootBoxRewards: LootBoxReward[] | null = JSON.parse(localStorage.getItem(LOOTBOX_REWARDS_LOCALSTORAGE) ?? '0')
        if (lootBoxRewards) {
            dispatch(lootBoxActions.openModal(lootBoxRewards))
        }
    }, [])

    if (!lootBoxList?.length) {
        return <Title className={cls.title} weight='1'>Список лутбоксов пуст</Title>
    }

    return (
    <DynamicModuleLoader reducers={reducers}>
        <div className={clsx(cls.lootBoxList, {}, [className])}>
            <Title weight="1" caps className={cls.title}>
                Loot boxes
            </Title>
            <div className={cls.items}>
                {
                    lootBoxList?.map((lootBox) => (
                        lootBox.prices.map((price, index) => (
                            <LootBoxItem price={price} count={index+1} lootBox={lootBox} key={`${lootBox.id}_${price}`}/>
                        ))
                    ))
                }
                
            </div>
        </div>
        <LootBoxClaimModal />
    </DynamicModuleLoader>

    );
}