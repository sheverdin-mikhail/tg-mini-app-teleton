import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { getGameIsBanned } from '../../model/selectors/gameSelector';
import { Modal } from '@/shared/ui/Modal/Modal';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { gameActions } from '../../model/slice/gameSlice';
import { applyUserBoost, getUserBoosts } from '@/entities/User';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FontSize, FontWeight, Text } from '@/shared/ui/Text/Text';
import StrikeImage from '@/shared/assets/img/attention.png';
import DefenceIcon from '@/shared/assets/img/defence.png';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import cls from './GameBunModal.module.scss';

interface GameBunModalProps {
    className?: string;
}

export const GameBunModal: React.FC<GameBunModalProps> = (props) => {
    const { className } = props;
    const isBanned = useSelector(getGameIsBanned);
    const dispatch = useAppDispatch();
    const userBoosts = useSelector(getUserBoosts);
    const [disabled, setDisabled] = useState(true);
    const timeoutRef = useRef<any>(null);
    const banDefence = useMemo(() => userBoosts?.find((boost) => Object.keys((boost?.settings ?? {})).includes('banDefence')), [userBoosts]);

    const onCancelHandler = () => {
        dispatch(gameActions.finishStream())
    }

    const onUseBunDefence = () => {
        if (banDefence?.user_boost.isPurchased) {
            dispatch(gameActions.getUnbunned())
            dispatch(applyUserBoost(banDefence))
        }
    }

    useEffect(() => {
        if (isBanned) {
            timeoutRef.current = setTimeout(() => setDisabled(false), 1000)
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [isBanned])
    

    return (
        <Modal className={clsx(cls.gameBunModal, {}, [className])} isOpen={isBanned} onClose={onCancelHandler}>
            <div className={cls.block}>
                <img src={StrikeImage} className={cls.rewardImage} />
                <Text caps className={cls.title} size={FontSize.LG} weight={FontWeight.MEDIUM}>
                    Oops, you got a strike
                </Text>
            </div>
            <div className={cls.block}>
                <Text className={cls.text}>It looks like the stream has come to an end</Text>
                {

                    !banDefence?.user_boost.isPurchased && <Text className={cls.text}>Use the Ban defence next time!</Text>
                }
            </div>
            <div className={cls.buttons}>
                {
                    banDefence?.user_boost.isPurchased && <Button onClick={onUseBunDefence} className={cls.button} disabled={disabled}> 
                        <img src={DefenceIcon} className={cls.defenceIcon} />
                        Use ban defence
                    </Button>
                }
                <Button theme={
                    banDefence?.user_boost.isPurchased ? ButtonTheme.SECONDARY : ButtonTheme.PRIMARY
                } onClick={onCancelHandler} className={cls.button} disabled={disabled}>Finish stream</Button>
            </div>
        </Modal>
    );
}