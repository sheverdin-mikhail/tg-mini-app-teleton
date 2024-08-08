import { Stream, StreamsList } from '@/entities/Stream';
import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import {
  getCurrentAvailableStreamsCount,
} from '@/entities/User';
import cls from './GameStreams.module.scss';
import { getGameIsStarted } from '../../model/selectors/gameSelector';
import { GameStartModal } from '../GameStartModal/GameStartModal';
import { gameActions } from '../../model/slice/gameSlice';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Button, Title } from '@telegram-apps/telegram-ui';

interface GameStreamsProps {
  className?: string;
}

export const GameStreams: React.FC<GameStreamsProps> = (props) => {
  const { className, } = props;
  const dispatch = useAppDispatch();
  const isStarted = useSelector(getGameIsStarted);
  const availableStreams = useSelector(getCurrentAvailableStreamsCount);
  const [gameStartIsOpnen, setGameStartIsOpen] = useState(false);
  const [streamsIsOpen, setStreamsIsOpen] = useState(false);


  const handleTouch = useCallback((stream: Stream) => {
    setGameStartIsOpen(true);
    dispatch(gameActions.choseStream(stream));
  }, [dispatch]);

  const onModalCloseHandler = useCallback(() => {
    setGameStartIsOpen(false);
  }, []);

  const onStartStreamHandler = useCallback(() => {
    setGameStartIsOpen(false);
    setStreamsIsOpen(false)
  }, []);


  return (
    <>
      <Button onClick={() => setStreamsIsOpen(true)}>Start streaming</Button>
      <Modal className={clsx(cls.gameStreams, {}, [className])} isOpen={streamsIsOpen} onClose={() => setStreamsIsOpen(false)}>
        <Title className={cls.title}>Select the type of stream</Title>
        <StreamsList onClick={handleTouch} disabled={isStarted || availableStreams === 0} />
      </Modal>
      <GameStartModal isOpen={gameStartIsOpnen} onClose={onModalCloseHandler} onStartStream={onStartStreamHandler} />
    </>
  );
};
