import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { GameLevel } from '../GameLevel/GameLevel';
import { GameTimer } from '../GameTimer/GameTimer';
import { gameActions } from '../../model/slice/gameSlice';
import { getGameIsInit } from '../../model/selectors/gameSelector';
import { GameStreams } from '../GameStreams/GameStreams';
import { GamePoints } from '../GamePoints/GamePoints';

interface GameProps {
  className?: string;
}

export const Game: React.FC<GameProps> = () => {
  const isInit = useSelector(getGameIsInit);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isInit) {
      dispatch(gameActions.initGame());
    }
  }, [isInit, dispatch]);

  return (

    <>
      <GameTimer />
      <GameStreams />
      <GamePoints />
      <GameLevel />
    </>
  );
};
