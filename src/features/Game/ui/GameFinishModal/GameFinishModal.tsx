import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getUserTotalPoins } from '@/entities/User';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Button, Text, Title } from '@telegram-apps/telegram-ui';
import ViewsIcon from '@/shared/assets/icons/views-icon.svg';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { gameActions } from '../../model/slice/gameSlice';
import { useSavePoints } from '../../api/gameApi';
import { getGameFarmedPoints, getGameStream } from '../../model/selectors/gameSelector';
import cls from './GameFinishModal.module.scss';
import { AwesomeIcon } from '@/shared/ui/AwesomeIcon/AwesomeIcon';

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
  const stream = useSelector(getGameStream);
  const farmedPoints = useSelector(getGameFarmedPoints);
  const [savePointsMutation] = useSavePoints();
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
      <Title caps className={cls.title} weight="1">
        Stream is ended
      </Title>
      <AwesomeIcon icon='fa-solid fa-trophy' className={cls.icon} />
      <Text className={cls.text} weight="1">
        During the stream, you received <span className={cls.points}>{farmedPoints} <ViewsIcon className={cls.viewsIcon} /></span>
      </Text>
      <Text className={cls.text} weight="1">
        You completed the stream and earned a bonus of <span className={cls.points}>{Math.trunc(bonus)} <ViewsIcon className={cls.viewsIcon} /></span>
      </Text>
      
      <div className={cls.buttons}>
        <Button className={cls.button} onClick={onCloseHandler}>Cool!</Button>
      </div>
    </Modal>
  );
};
