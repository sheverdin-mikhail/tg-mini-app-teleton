import { Stream, StreamsList } from '@/entities/Stream';
import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import {
  getCurrentAvailableStreamsCount,
  makeGetUserBoost,
} from '@/entities/User';
import cls from './GameStreams.module.scss';
import { getGameIsStarted, getGameStreamsModalIsOpen } from '../../model/selectors/gameSelector';
import { GameStartModal } from '../GameStartModal/GameStartModal';
import { gameActions } from '../../model/slice/gameSlice';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Button, Title } from '@telegram-apps/telegram-ui';
import { StateSchema } from '@/app/providers';
import { useNavigate } from 'react-router-dom';

interface GameStreamsProps {
  className?: string;
}

export const GameStreams: React.FC<GameStreamsProps> = (props) => {
  const { className, } = props;
  const dispatch = useAppDispatch();
  const isStarted = useSelector(getGameIsStarted);
  const availableStreams = useSelector(getCurrentAvailableStreamsCount);
  const getBoost = makeGetUserBoost();
  const advancedStream = useSelector((state: StateSchema) => getBoost(state, '2'))
  const [gameStartIsOpnen, setGameStartIsOpen] = useState(false);
  const isOpen = useSelector(getGameStreamsModalIsOpen);
  const navigate = useNavigate();

  const handleTouch = useCallback((stream: Stream) => {
    setGameStartIsOpen(true);
    dispatch(gameActions.choseStream(stream));
  }, [dispatch]);

  const onModalCloseHandler = useCallback(() => {
    setGameStartIsOpen(false);
  }, []);

  const onStartStreamHandler = useCallback(() => {
    setGameStartIsOpen(false);
    dispatch(gameActions.closeStreamsModal())
  }, []);

  const onBuyStreamClick = useCallback(() => {
    setGameStartIsOpen(false);
    dispatch(gameActions.closeStreamsModal());
    navigate('/boost')
  }, []); 


  if (availableStreams === 0 && !advancedStream?.isPurchased) {
    return (
      <>
        <Button onClick={() => dispatch(gameActions.openStreamsModal())}>Start streaming</Button>
        <Modal className={clsx(cls.gameStreams, {}, [className])} isOpen={isOpen} onClose={() => dispatch(gameActions.closeStreamsModal())}>
          <Title className={cls.title}>You have 0 streams available. Buy an additional stream or come back later</Title>
          <Button onClick={onBuyStreamClick}>Buy stream</Button>
        </Modal>
      </>
    )
  } else if (availableStreams === 0 && advancedStream?.isPurchased) {
    return (
      <>
        <Button onClick={() => dispatch(gameActions.openStreamsModal())}>Start streaming</Button>
        <Modal className={clsx(cls.gameStreams, {}, [className])} isOpen={isOpen} onClose={() => dispatch(gameActions.closeStreamsModal())}>
          <Title className={cls.title}>You have 0 streams available. Сome back later</Title>
          <Button onClick={() => dispatch(gameActions.closeStreamsModal())}>OK</Button>
        </Modal>
      </>
    )
  }


  return (
    <>
      <Button onClick={() => dispatch(gameActions.openStreamsModal())}>Start streaming</Button>
      <Modal className={clsx(cls.gameStreams, {}, [className])} isOpen={isOpen} onClose={() => dispatch(gameActions.closeStreamsModal())}>
        <Title className={cls.title}>Select the type of stream</Title>
        <StreamsList onClick={handleTouch} disabled={isStarted || availableStreams === 0} />
      </Modal>
      <GameStartModal isOpen={gameStartIsOpnen} onClose={onModalCloseHandler} onStartStream={onStartStreamHandler} />
    </>
  );
};
