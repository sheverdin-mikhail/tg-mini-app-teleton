import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { GameLevel } from '../GameLevel/GameLevel';
import { GamePoints } from '../GamePoints/GamePoints';
import { GameTimer } from '../GameTimer/GameTimer';
import { gameActions, gameReducer } from '../../model/slice/gameSlice';
import { getGameIsInit } from '../../model/selectors/gameSelector';

interface GameProps {
  className?: string;
}

const reducers: ReducersList = {
  game: gameReducer,
};

export const Game: React.FC<GameProps> = (props) => {
  const isInit = useSelector(getGameIsInit);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isInit) {
      dispatch(gameActions.initGame());
    }
  }, [isInit, dispatch]);

  return (

    <DynamicModuleLoader reducers={reducers}>
      <GamePoints />
      <GameTimer />
      <GameLevel />
    </DynamicModuleLoader>
  );
};
