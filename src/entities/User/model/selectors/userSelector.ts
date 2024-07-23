import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers';

export const getUser = (state: StateSchema) => state.user.user;
export const getUserCurrentLevel = (state: StateSchema) => state.user.user.level;
export const getUserCurrentDailyReward = (state: StateSchema) => state.user.user.daily_reward;
export const getUserLastDailyRewardClaimDate = (state: StateSchema) => state.user.user.lastClaimDailyReward;
export const getUserAvailableToClaimDailyRewardDate = (state: StateSchema) => state.user.user.availableToClaimDailyRewardDate;
export const getUserIsInit = (state: StateSchema) => state.user.isInit;
export const getUserIsLoading = (state: StateSchema) => state.user.isLoading;
export const getUserTotalPoins = (state: StateSchema) => state.user.user.totalPoints;
export const getUserDailyRewardStreak = (state: StateSchema) => state.user.user.dailyRewardStreak;
export const getUserStreamDurationMinutes = (state: StateSchema) => state.user.user.streamDurationMinutes;

export const getUserCurrentConditions = createSelector(getUser, (user) => {
  const {
    totalPoints, referrals, dailyRewardStreak, complitedDailyTasksCount,
  } = user;
  return {
    totalPoints,
    referrals,
    dailyRewardStreak,
    complitedDailyTasksCount,
  };
});
