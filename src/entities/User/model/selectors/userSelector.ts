import { StateSchema } from 'app/providers';

export const getUser = (state: StateSchema) => state.user.user;
export const getUserCurrentLevel = (state: StateSchema) => state.user.user.currentLevel;
export const getUserIsInit = (state: StateSchema) => state.user.isInit;
export const getUserIsLoading = (state: StateSchema) => state.user.isLoading;
export const getUserTotalPoins = (state: StateSchema) => state.user.user.totalPoints;
