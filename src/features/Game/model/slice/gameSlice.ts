import { createSlice } from '@reduxjs/toolkit';
import { GameSchema } from '../types/game';

const initialState: GameSchema = {
  isInit: false,
  isLoading: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => builder,
});

export const { actions: gameActions } = gameSlice;
export const { reducer: gameReducer } = gameSlice;
