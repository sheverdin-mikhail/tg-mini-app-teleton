import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers';

export const getGame = (state: StateSchema) => state.game;
export const getGameIsInit = createSelector(getGame, (game) => game?.isInit ?? false);
export const getGameStartedAt = createSelector(getGame, (game) => game?.startedAt);
export const getGameFinishAt = createSelector(getGame, (game) => game?.finishAt);
export const getGameIsDisabled = createSelector(getGame, (game) => game?.isDisabled);
export const getGameIsAvaiableToStart = (state: StateSchema) => state.game?.isAvailableToStart;
export const getGameIsStarted = (state: StateSchema) => state.game?.isStarted;
export const getGameIsFinish = (state: StateSchema) => state.game?.isFinish;
export const getGameStream = (state: StateSchema) => state.game?.activeStream;
export const getGameFarmedPoints = (state: StateSchema) => state.game?.farmedPoints;
export const getGameTime = createSelector(getGame, (game) => ({
  startedAt: game?.startedAt,
  finishAt: game?.finishAt,
}));
export const getGameIsPaused = (state: StateSchema) => state.game?.isPaused;
export const getGameTapEvents = (state: StateSchema) => state.game?.gameTapEvents;
export const getGameIsBanned = (state: StateSchema) => state.game?.isBanned;
export const getGameHasBanned = (state: StateSchema) => state.game?.hasBanned;



