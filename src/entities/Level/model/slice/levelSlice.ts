import { createSlice } from '@reduxjs/toolkit';
import { LevelsSchema } from '../types/level';

const initialState: LevelsSchema = {
  isInit: false,
  isLoading: false,
  isError: false,
  error: '',
  levels: [
    {
      level: 1,
      pointToNextLevel: 20000,
      referralsToNextLevel: 3,
      tasksToNextLevel: 3,
    },
    {
      level: 2,
      pointToNextLevel: 60000,
      referralsToNextLevel: 3,
      tasksToNextLevel: 5,
    },
    {
      level: 3,
      pointToNextLevel: 100000,
      referralsToNextLevel: 6,
      tasksToNextLevel: 15,
    },
  ],
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
