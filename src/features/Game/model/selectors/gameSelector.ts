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

export const getGameTime = createSelector(getGame, (game) => ({
  startedAt: game?.startedAt,
  finishAt: game?.finishAt,
}));
