import { StateSchema } from 'app/providers';

export const getUser = (state: StateSchema) => state.user.user;
export const getUserCurrentLevel = (state: StateSchema) => state.user.user.currentLevel;
export const getUserCurrentDailyReward = (state: StateSchema) => state.user.user.daily_reward;
export const getUserLastDailyRewardClaimDate = (state: StateSchema) => state.user.user.lastClaimDailyReward;
export const getUserAvailableToClaimDailyRewardDate = (state: StateSchema) => state.user.user.availableToClaimDailyRewardDate;
export const getUserIsInit = (state: StateSchema) => state.user.isInit;
export const getUserIsLoading = (state: StateSchema) => state.user.isLoading;
export const getUserTotalPoins = (state: StateSchema) => state.user.user.totalPoints;
