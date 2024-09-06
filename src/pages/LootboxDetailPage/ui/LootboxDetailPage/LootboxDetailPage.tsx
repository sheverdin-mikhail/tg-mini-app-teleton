import clsx from 'clsx';
import cls from './LootboxDetailPage.module.scss';
import { useParams } from 'react-router-dom';
import { useGetLootBoxList } from '@/features/LootBox/api/lootBoxApi';
import { PageContentHeader } from '@/widgets/PageContentHeader';
import LootboxImage from '@/shared/assets/img/lootbox.png';
import { Container } from '@/shared/ui/Container/Container';
import { LootboxDetailContent } from '../LootboxDetailContent/LootboxDetailContent';
import { useEffect, useMemo } from 'react';
import { useTelegram } from '@/shared/lib/hooks/useTelegram/useTelegram';


interface LootboxDetailPageProps {
    className?: string;
}

export const LootboxDetailPage: React.FC<LootboxDetailPageProps> = (props) => {
    const { className } = props;
    const { lootboxId, lootboxCount } = useParams()
    const {data: lootboxList} = useGetLootBoxList()
    const { initBackButton, removeBackButton } = useTelegram()

    const lootbox = useMemo(() => lootboxList?.find(lootbox => lootbox.id === lootboxId), [lootboxList])

    useEffect(() => {
        initBackButton()
        return () => removeBackButton()
    }, [])

    return (
        <div className={clsx(cls.LootboxDetailPage, {}, [className])}>
            <Container>
                <PageContentHeader title='Lootbox' description='May contain one of the following rewards' img={LootboxImage} />
                <LootboxDetailContent 
                    lootboxId={lootboxId!!} 
                    count={+lootboxCount!!}  
                    rewards={lootbox?.lootBoxRewards} 
                    price={lootbox?.prices[+lootboxCount!! - 1]} 
                />
            </Container>
        </div>
    );
}