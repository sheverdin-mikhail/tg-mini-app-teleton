import { Boost, BoostIcon, useClaimBoost } from '@/entities/Boost';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { lootBoxActions } from '@/features/LootBox/model/slice/lootBox';
import { useCallback } from 'react';
import { FontSize, FontWeight, Text } from '@/shared/ui/Text/Text';
import cls from '../LootBoxClaimModalContent.module.scss';
import { Button } from '@/shared/ui/Button/Button';

interface LootBoxClaimModalBoostContentProps {
    className?: string;
    boost: Boost;
}

export const LootBoxClaimModalBoostContent: React.FC<LootBoxClaimModalBoostContentProps> = (props) => {
    const { boost } = props;
    const dispatch = useAppDispatch();
    const [claimBoostMutation, {isLoading}] = useClaimBoost()

    const onClickHandler = useCallback(() => {
        claimBoostMutation(boost.id)
        dispatch(lootBoxActions.closeModal())
    }, [boost])

    return (
        <>
            {
                boost 
                    ? <>
                        <div className={cls.block}>
                            <img className={cls.img} src={BoostIcon[boost.type]} />
                            <Text className={cls.text} size={FontSize.LG} weight={FontWeight.MEDIUM}>Congratulations! Here is your reward!</Text>
                        </div>
                        <div className={cls.block}>
                            <Text weight={FontWeight.MEDIUM}>{boost.title}</Text>
                            <Text>{boost.description}</Text>
                        </div>
                    </>
                    : <Text className={cls.text}>Sorry, we can't get data about your reward</Text>
            }
                
            <Button className={cls.button} onClick={onClickHandler} disabled={isLoading} loading={isLoading}>
                {
                    boost
                    ? "Cool!"
                    : "Close"
                }
            </Button>
        </>
    );
}