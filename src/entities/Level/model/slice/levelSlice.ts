import { createSlice } from '@reduxjs/toolkit';
import { LevelsSchema } from '../types/level';

const initialState: LevelsSchema = {
  isInit: false,
  isLoading: false,
  isError: false,
  error: '',
  levels: [],
};

export const levelsSlice = createSlice({
  name: 'levels',
  initialState,
  reducers: {
    initLevels: (state) => {
      state.isInit = true;
    },
  },
  extraReducers: (builder) => builder,
});

export const { actions: levelsActions } = levelsSlice;
export const { reducer: levelsReducer } = levelsSlice;
