import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
      referalsToNextLevel: 3,
      tasksToNextLevel: 3,
      imgUrl: '',
    },
    {
      level: 2,
      pointToNextLevel: 60000,
      referalsToNextLevel: 3,
      tasksToNextLevel: 5,
      imgUrl: '',
    },
    {
      level: 3,
      pointToNextLevel: 100000,
      referalsToNextLevel: 6,
      tasksToNextLevel: 15,
      imgUrl: '',
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
