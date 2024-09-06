export { Game } from './ui/Game/Game';
export { GamePoints } from './ui/GamePoints/GamePoints';
export { GameLevelProgress } from './ui/GameLevelProgress/GameLevelProgress';
export { GameTimer } from './ui/GameTimer/GameTimer';
export { gameActions, gameReducer } from './model/slice/gameSlice';
export type { GameSchema } from './model/types/game';

export {
  getGame,
  getGameFarmedPoints,
  getGameFinishAt,
  getGameIsAvaiableToStart,
  getGameIsDisabled,
  getGameIsFinish,
  getGameIsInit,
  getGameIsStarted,
  getGameStartedAt,
  getGameTime,
} from './model/selectors/gameSelector';

export {
  useSavePoints,
  useStartGame,
  useLevelUp,
} from './api/gameApi';
