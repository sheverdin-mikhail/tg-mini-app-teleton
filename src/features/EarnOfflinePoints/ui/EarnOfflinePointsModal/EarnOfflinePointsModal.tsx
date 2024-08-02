import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { earnIncomePerSeconds, getLastSyncAt, getUserTotalPoins, userActions } from '@/entities/User';
import moment from 'moment';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Button, Text, Title } from '@telegram-apps/telegram-ui';
import { ViewsIcon } from '@/shared/ui/ViewsIcon/ViewsIcon';
import cls from './EarnOfflinePointsModal.module.scss';
import { useSavePoints } from '@/features/Game';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface EarnOfflinePointsModalProps {
    className?: string;
}

export const EarnOfflinePointsModal: React.FC<EarnOfflinePointsModalProps> = (props) => {
    const { className } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [isInit, setIsInit] = useState(false);
    const [passiveIncome, setPassiveIncome] = useState(0);
    const lastSyncAt = useSelector(getLastSyncAt);
    const incomePerSeconds = useSelector(earnIncomePerSeconds);
    const totalPoints = useSelector(getUserTotalPoins);
    const [savePointsMutation] = useSavePoints();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const now = moment();
        const syncAt = moment(lastSyncAt);

        const seconds = now.diff(syncAt, 'seconds')

        const earnSum = Number(incomePerSeconds) * seconds; 
        if (earnSum >= 1 && !isInit) {
            setIsOpen(true)
            setPassiveIncome(earnSum)
            dispatch(userActions.increaseUserPoints(Number(incomePerSeconds)))
        }
        setIsInit(true)
    }, [setIsOpen, lastSyncAt, isInit, totalPoints])

    const onCloseHandler = useCallback(() => {
        setIsOpen(false)
        savePointsMutation(totalPoints + Number(incomePerSeconds))
    }, [totalPoints, setIsOpen, incomePerSeconds])

    return (
        <Modal 
            className={clsx(cls.modal, {}, [className])} 
            onClose={onCloseHandler} 
            isOpen={isOpen}
        >
            <Title className={cls.title}>The recordings of your streams have been watched.</Title>

            <Text weight='1' className={cls.text}>{Math.trunc(passiveIncome)} <ViewsIcon className={cls.icon}/></Text>
            <Button className={cls.button} onClick={onCloseHandler}>
                Thank you
            </Button>
        </Modal>
    );
}