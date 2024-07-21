import { StateSchema } from 'app/providers';

export const getLevels = (state: StateSchema) => state.levels.levels;
export const getLevelsIsLoading = (state: StateSchema) => state.levels.isLoading;
export const getLevelsIsInit = (state: StateSchema) => state.levels.isInit;
export const getLevelsIsError = (state: StateSchema) => state.levels.isError;
export const getLevelsError = (state: StateSchema) => state.levels.error;
