import {
  AnyAction, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { CombinedState } from 'redux';
import { AxiosInstance } from 'axios';
import { MainPageSchema } from '@/pages/MainPage';
import { UserSchema } from '@/entities/User';
import { rtkApi } from '@/shared/api/rtkApi';
import { LevelsSchema } from '@/entities/Level';
import { GameSchema } from '@/features/Game';

export interface StateSchema {
    user: UserSchema
    levels: LevelsSchema
    game: GameSchema
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
    // Асинхронные редюсеры
    // pages
    mainPage?: MainPageSchema
    // entities

    // widgets

    // features
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
