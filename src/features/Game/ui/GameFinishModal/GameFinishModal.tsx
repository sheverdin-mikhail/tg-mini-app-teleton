import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getUserTotalPoins } from '@/entities/User';
import { Modal } from '@/shared/ui/Modal/Modal';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { gameActions } from '../../model/slice/gameSlice';
import { useSavePoints } from '../../api/gameApi';
import { getGameActiveStream, getGameFarmedPoints,  } from '../../model/selectors/gameSelector';
import { ViewsIcon } from '@/shared/ui/ViewsIcon/ViewsIcon';
import { FontSize, FontWeight, Text } from '@/shared/ui/Text/Text';
import { Button } from '@/shared/ui/Button/Button';
import RewardImage from '@/shared/assets/img/finish.png';
import cls from './GameFinishModal.module.scss';
import { formatNumber } from '@/shared/lib/utils/formatNumber';


interface GameFinishModalProps {
    className?: string;
    onClose?: () => void;
    isOpen: boolean;
}

export const GameFinishModal: React.FC<GameFinishModalProps> = (props) => {
  const {
    isOpen,
    onClose,
  } = props;
  const stream = useSelector(getGameActiveStream);
  const farmedPoints = useSelector(getGameFarmedPoints);
  const [savePointsMutation, {isLoading}] = useSavePoints();
  const totalPoints = useSelector(getUserTotalPoins);
  const dispatch = useAppDispatch();

  const bonus = useMemo(() => {
    const multipliyedPoints = farmedPoints * (stream?.pointsMultiplier ?? 1);
    return multipliyedPoints - farmedPoints;
  }, [farmedPoints, stream]);

  const onCloseHandler = useCallback(() => {
    onClose?.();
    savePointsMutation((totalPoints + bonus));
    dispatch(gameActions.finishStream());
  }, [onClose, totalPoints, bonus, savePointsMutation, dispatch]);

  return (
    <Modal isOpen={isOpen} onClose={onCloseHandler} className={cls.gameFinishModal}>
      <div className={cls.block}>
        <img src={RewardImage} className={cls.rewardImage} />
        <Text className={cls.title} weight={FontWeight.MEDIUM} size={FontSize.LG}>Stream is finished!</Text>
      </div>

      <div className={cls.block}>
        <Text className={cls.text}>
          During the stream, you received
        </Text>
        <Text className={cls.points} size={FontSize.LG} weight={FontWeight.MEDIUM}><ViewsIcon className={cls.viewsIcon} /> {formatNumber(farmedPoints.toString())} </Text>
      </div>

      <div className={cls.block}>
        <Text className={cls.text}>
          You completed the stream and earned a bonus of
        </Text>
        <Text className={cls.points} size={FontSize.LG} weight={FontWeight.MEDIUM}><ViewsIcon className={cls.viewsIcon} /> {formatNumber(Math.trunc(bonus).toString())} </Text>
      </div>
      
      <Button className={cls.button} onClick={onCloseHandler} disabled={isLoading} loading={isLoading}>Cool!</Button>
    </Modal>
  );
};
