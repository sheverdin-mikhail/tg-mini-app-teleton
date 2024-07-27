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

interface GameStreamsProps {
    className?: string;
}

export const GameStreams: React.FC<GameStreamsProps> = (props) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const isStarted = useSelector(getGameIsStarted);
  const availableStreams = useSelector(getCurrentAvailableStreamsCount);
  const [gameStartIsOpnen, setGameStartIsOpnen] = useState(false);

  const handleTouch = useCallback((stream: Stream) => {
    setGameStartIsOpnen(true);
    dispatch(gameActions.choseStream(stream));
  }, [dispatch]);

  const onModalCloseHandler = useCallback(() => {
    setGameStartIsOpnen(false);
  }, []);

  return (
    <div className={clsx(cls.gameStreams, {}, [className])}>
      <StreamsList onClick={handleTouch} disabled={isStarted || availableStreams === 0} />
      <GameStartModal isOpen={gameStartIsOpnen} onClose={onModalCloseHandler} />
    </div>
  );
};
