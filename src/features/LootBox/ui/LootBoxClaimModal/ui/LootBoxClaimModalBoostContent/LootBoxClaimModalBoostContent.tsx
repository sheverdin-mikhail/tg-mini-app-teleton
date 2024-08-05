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
    const dispatch = useAppDispatch();
    const [claimBoostMutation] = useClaimBoost()

    const onClickHandler = useCallback(() => {
        claimBoostMutation(boost.id)
        dispatch(lootBoxActions.closeModal())
    }, [boost])

    return (
        <div className={clsx(cls.content, {}, [className])}>
            {
                boost 
                    ? <Title weight="1" className={cls.text}>Your reward is {boost.title}</Title>
                    : <Title weight="1" className={cls.text}>Sorry, we can't get data about your reward</Title>
            }
                
            <Button onClick={onClickHandler}>
                {
                    boost
                    ? "Cool!"
                    : "Close"
                }
            </Button>
        </div>
    );
}