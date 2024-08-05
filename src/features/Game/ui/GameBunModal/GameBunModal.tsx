import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { getGameIsBanned } from '../../model/selectors/gameSelector';
import { Modal } from '@/shared/ui/Modal/Modal';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { gameActions } from '../../model/slice/gameSlice';
import { Button, Text, Title } from '@telegram-apps/telegram-ui';
import { applyUserBoost, getUserBoosts } from '@/entities/User';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AwesomeIcon } from '@/shared/ui/AwesomeIcon/AwesomeIcon';
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
            <Title caps className={cls.title} weight="1">
                Oops
            </Title>
            <AwesomeIcon icon='fa-solid fa-ban' className={cls.icon} />
            <Text className={cls.text}>You got a strike. It looks like the stream has come to an end</Text>
            <div className={cls.buttons}>
                <Button onClick={onCancelHandler} className={cls.button} disabled={disabled}>finish stream</Button>
                {
                    banDefence?.user_boost.isPurchased && <Button onClick={onUseBunDefence} className={cls.button} disabled={disabled}>🛡 Use ban defence</Button>
                }
            </div>
        </Modal>
    );
}