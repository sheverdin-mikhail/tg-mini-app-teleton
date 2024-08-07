import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers';
import moment from 'moment';
import { Boost } from '@/entities/Boost';

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
export const getLastSyncAt = (state: StateSchema) => state.user.user.lastSyncAt;
export const getEarnIncomePerDay = (state: StateSchema) => state.user.user.earnIncomePerDay;
export const getUserDailyStreamsCount= (state: StateSchema) => state.user.user.dailyStreamsCount;



export const earnIncomePerSeconds = createSelector(getEarnIncomePerDay, (incomePerDay) => {
  if (incomePerDay) {
    return incomePerDay / 86400
  }

  return null
});



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


export const makeGetUserBoost = (_state?: StateSchema, _p0?: number) => createSelector(
  [getUserBoosts, (_: StateSchema, boostId: Boost['id']) => boostId],
  (boosts, boostId) => {
    console.log(boosts)
    console.log(boosts?.find(boost => boost.id === boostId)?.user_boost?.dailyUseCount)
    return boosts?.find(boost => boost.id === boostId)?.user_boost?.dailyUseCount
  }
);