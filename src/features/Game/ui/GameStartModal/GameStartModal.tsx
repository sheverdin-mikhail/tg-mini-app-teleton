import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { applyUserBoost, getUserBoosts } from '@/entities/User';
import { useStartGame } from '@/features/Game/api/gameApi';
import { gameActions } from '@/features/Game/model/slice/gameSlice';
import { Modal } from '@/shared/ui/Modal/Modal';
import { getGameActiveStream } from '@/features/Game/model/selectors/gameSelector';
import { Button } from '@telegram-apps/telegram-ui';
import EnergyImage from '@/shared/assets/img/energy.png';
import { Text } from '@/shared/ui/Text/Text';
import cls from './GameStartModal.module.scss';

interface GameStartModalProps {
    className?: string;
    onClose?: () => void;
    onStartStream?: () => void;
    isOpen: boolean;
}

export const GameStartModal: React.FC<GameStartModalProps> = (props) => {
  const {
    isOpen,
    onClose,
    onStartStream
  } = props;
  const dispatch = useAppDispatch();
  const userBoosts = useSelector(getUserBoosts);
  const [startGameMutation, {isLoading}] = useStartGame();
  const stream = useSelector(getGameActiveStream);

  const energyBoost = useMemo(() => userBoosts?.find((boost) => Object.keys((boost?.settings ?? {})).includes('durationMultiply')), [userBoosts]);

  const onCloseHandler = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const onStartHandler = useCallback(() => {
    if (stream) {
      if (energyBoost?.user_boost.isPurchased) {
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
      onStartStream?.();
    }
  }, [dispatch, startGameMutation, stream, energyBoost, onCloseHandler]);

  return (
    <Modal isOpen={isOpen} onClose={onCloseHandler} className={cls.gameStartModal}>
      <Text caps className={cls.title}>
        Start {stream?.title} stream now?
      </Text>
      <Text className={cls.title}>
      This stream is {stream?.duration} minute long
      </Text>
      {
        energyBoost?.user_boost.isPurchased && (
          <Text className={cls.title}>
            You have an energy drink. The duration of this stream will be increases x1.5
          </Text>
        )
      }
      <div className={cls.buttons}>
        <Button className={cls.button} onClick={onCloseHandler}>Not now</Button>
        <Button 
          disabled={isLoading} 
          loading={isLoading} 
          className={cls.button} 
          onClick={onStartHandler}
        >Go live { energyBoost?.user_boost.isPurchased && <span className={cls.energy}><img src={EnergyImage} className={cls.icon} />Energy boost</span> }</Button>
      </div>
    </Modal>
  );
};
