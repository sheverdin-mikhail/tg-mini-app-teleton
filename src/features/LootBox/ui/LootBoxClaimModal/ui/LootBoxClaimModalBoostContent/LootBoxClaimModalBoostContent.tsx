import clsx from 'clsx';
import cls from './LootBoxClaimModalBoostContent.module.scss';
import { Button, Title } from '@telegram-apps/telegram-ui';
import { Boost, useClaimBoost } from '@/entities/Boost';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { lootBoxActions } from '@/features/LootBox/model/slice/lootBox';
import { useCallback } from 'react';

interface LootBoxClaimModalBoostContentProps {
    className?: string;
    boost: Boost;
}

export const LootBoxClaimModalBoostContent: React.FC<LootBoxClaimModalBoostContentProps> = (props) => {
    const { className, boost } = props;
    // const [savePointsMutation] = use();
    const dispatch = useAppDispatch();
    const [claimBoostMutation] = useClaimBoost()

    const onClickHandler = useCallback(() => {
        claimBoostMutation(boost.id)
        dispatch(lootBoxActions.closeModal())
        console.log(boost.id)
    }, [boost])

    return (
        <div className={clsx(cls.content, {}, [className])}>
            <Title weight="1" className={cls.text}>Your reward is {boost.title}</Title>
                
            <Button onClick={onClickHandler}>Cool!</Button>
        </div>
    );
}