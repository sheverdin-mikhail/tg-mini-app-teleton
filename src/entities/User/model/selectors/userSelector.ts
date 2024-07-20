import { StateSchema } from 'app/providers';

export const getUser = (state: StateSchema) => state.user;
export const getUserIsNew = (state: StateSchema) => state.user.data?.isNew;
export const getUserIsLoading = (state: StateSchema) => state.user.isLoading;
