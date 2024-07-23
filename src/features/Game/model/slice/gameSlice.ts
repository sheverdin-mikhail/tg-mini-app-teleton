import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'entities/User';
import moment from 'moment';
import { GameSchema } from '../types/game';

const initialState: GameSchema = {
  isInit: false,
  isLoading: false,
  isDisabled: true,
  isStarted: false,
  isFinish: false,
  isAvailableToStart: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initGame: (state) => {
      const startAvailableAt = moment();
      state.isInit = true;
      state.isLoading = false;
      if (startAvailableAt && moment().isSameOrAfter(moment(startAvailableAt))) {
        state.isAvailableToStart = true;
      }
    },
    startGame: (state, action: PayloadAction<Pick<User, 'streamDurationMinutes'>>) => {
      state.startedAt = moment().toISOString();
      state.finishAt = moment(state.startedAt).add(action.payload.streamDurationMinutes, 'minutes').toISOString();
      state.isDisabled = false;
      state.isStarted = true;
      state.isAvailableToStart = false;
    },
    finishGame: (state) => {
      state.isDisabled = true;
      state.isStarted = false;
      state.isFinish = true;
      state.isAvailableToStart = false;
    },
  },
  extraReducers: (builder) => builder,
});

export const { actions: gameActions } = gameSlice;
export const { reducer: gameReducer } = gameSlice;
