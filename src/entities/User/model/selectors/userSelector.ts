import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers';
import moment from 'moment';

export const getUser = (state: StateSchema) => state.user.user;
export const getUserCurrentLevel = (state: StateSchema) => state.user.user.level;
export const getUserCurrentDailyReward = (state: StateSchema) => state.user.user.daily_reward;
export const getUserLastDailyRewardClaimDate = (state: StateSchema) => state.user.user.lastClaimDailyReward;
export const getUserAvailableToClaimDailyRewardDate = (state: StateSchema) => state.user.user.availableToClaimDailyRewardDate;
export const getUserIsInit = (state: StateSchema) => state.user.isInit;
export const getUserIsLoading = (state: StateSchema) => state.user.isLoading;
export const getUserTotalPoins = (state: StateSchema) => state.user.user.totalPoints;
export const getUserBoosts = (state: StateSchema) => state.user.user.boosts;
export const getUserActiveStream = (state: StateSchema) => state.user.user.activeStream;
export const getCurrentAvailableStreamsCount = (state: StateSchema) => state.user.user.currentAvailableStreamsCount;

export const getUserGameTime = createSelector(getUser, (user) => {
  const {
    gameStartedAt, gameFinishAt,
  } = user;
  const now = moment();
  if (now.isBefore(moment(gameFinishAt))) {
    return {
      startedAt: gameStartedAt,
      finishAt: gameFinishAt,
    };
  }
  return null;
});

export const getUserCurrentConditions = createSelector(getUser, (user) => {
  const {
    totalPoints, referrals,
  } = user;
  return {
    totalPoints,
    referrals,
  };
});
