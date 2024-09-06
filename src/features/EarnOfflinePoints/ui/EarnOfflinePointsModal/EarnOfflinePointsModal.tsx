import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { earnIncomePerSeconds, getLastSyncAt, getUserTotalPoins, userActions } from '@/entities/User';
import moment from 'moment';
import { Modal } from '@/shared/ui/Modal/Modal';
import { ViewsIcon } from '@/shared/ui/ViewsIcon/ViewsIcon';
import { useSavePoints } from '@/features/Game';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { FontSize, FontWeight, Text } from '@/shared/ui/Text/Text';
import RewardImage from '@/shared/assets/img/finish.png';
import { Button } from '@/shared/ui/Button/Button';
import cls from './EarnOfflinePointsModal.module.scss';
import { formatNumber } from '@/shared/lib/utils/formatNumber';

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
    const [savePointsMutation, {isLoading} ] = useSavePoints();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const now = moment();
        const syncAt = moment(lastSyncAt);

        const seconds = now.diff(syncAt, 'seconds')

        const earnSum = Number(incomePerSeconds) * seconds; 
        if (earnSum >= 1 && !isInit) {
            setIsOpen(true)
            setPassiveIncome(earnSum)
        }
        setIsInit(true)
    }, [setIsOpen, lastSyncAt, isInit, totalPoints])

    const onCloseHandler = useCallback(() => {
        setIsOpen(false)
        dispatch(userActions.increaseUserPoints(Number(passiveIncome)))
        savePointsMutation(Number(passiveIncome) + totalPoints)
    }, [totalPoints, setIsOpen, passiveIncome])

    return (
        <Modal 
            className={clsx(cls.modal, {}, [className])} 
            onClose={onCloseHandler} 
            isOpen={isOpen}
        >
            <img src={RewardImage} className={cls.rewardImage} />
            <Text className={cls.title} weight={FontWeight.MEDIUM} size={FontSize.LG}>The recordings of your streams have been watched.</Text>

            <Text className={cls.text} size={FontSize.LG} weight={FontWeight.MEDIUM}>You recieved <ViewsIcon className={cls.icon}/> {formatNumber(Math.trunc(passiveIncome).toString())} </Text>
            <Button className={cls.button} onClick={onCloseHandler} disabled={isLoading} loading={isLoading} >
                Cool
            </Button>
        </Modal>
    );
}