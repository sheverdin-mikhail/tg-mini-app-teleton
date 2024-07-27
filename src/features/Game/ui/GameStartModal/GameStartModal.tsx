import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { applyUserBoost, getUserBoosts } from '@/entities/User';
import { useStartGame } from '@/features/Game/api/gameApi';
import { gameActions } from '@/features/Game/model/slice/gameSlice';
import { Modal } from '@/shared/ui/Modal/Modal';
import { getGameStream } from '@/features/Game/model/selectors/gameSelector';
import { Button, Title } from '@telegram-apps/telegram-ui';
import FlashIcon from '@/shared/assets/icons/flash-icon.svg';
import cls from './GameStartModal.module.scss';

interface GameStartModalProps {
    className?: string;
    onClose?: () => void;
    isOpen: boolean;
}

export const GameStartModal: React.FC<GameStartModalProps> = (props) => {
  const {
    isOpen,
    onClose,
  } = props;
  const dispatch = useAppDispatch();
  const userBoosts = useSelector(getUserBoosts);
  const [startGameMutation] = useStartGame();
  const stream = useSelector(getGameStream);

  const energyBoost = useMemo(() => userBoosts?.find((boost) => Object.keys((boost?.settings ?? {})).includes('durationMultiply')), [userBoosts]);

  const onCloseHandler = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const onStartHandler = useCallback(() => {
    if (stream) {
      if (energyBoost) {
        startGameMutation({ stream, boost: energyBoost });
        dispatch(gameActions.startStream({
          stream,
          boost: energyBoost,
        }));
        dispatch(applyUserBoost(energyBoost));
      } else {
        startGameMutation({ stream });
        dispatch(gameActions.startStream({
          stream,
        }));
      }
      onCloseHandler();
    }
  }, [dispatch, startGameMutation, stream, energyBoost, onCloseHandler]);

  return (
    <Modal isOpen={isOpen} onClose={onCloseHandler} className={cls.gameStartModal}>
      <Title caps className={cls.title} weight="1">
        Start {stream?.title} stream now?
      </Title>
      <div className={cls.buttons}>
        <Button className={cls.button} onClick={onCloseHandler}>No, Thanks</Button>
        <Button className={cls.button} onClick={onStartHandler}>Yes { energyBoost && <span className={cls.energy}>(<img src={FlashIcon} className={cls.icon} />boost )</span> }</Button>
      </div>
    </Modal>
  );
};
