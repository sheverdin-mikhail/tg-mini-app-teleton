import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { Stream } from '@/entities/Stream';
import { Boost } from '@/entities/Boost';
import { GameSchema, GameTapEventType } from '../types/game';

const initialState: GameSchema = {
  isInit: false,
  isLoading: false,
  isDisabled: true,
  isStarted: false,
  isFinish: false,
  isAvailableToStart: false,
  streamsModalIsOpen: false,
  farmedPoints: 0,
  gameTapEvents: [
    {
      chance: 9500, 
      type: GameTapEventType.VIEW
    },
    {
      chance: 244.5,
      type: GameTapEventType.COMMENT
    },
    {
      chance: 244.5,
      type: GameTapEventType.EMOJI
    },
    {
      chance: 1,
      type: GameTapEventType.BAN
    },
  ]
};

interface StartStreamProps {
  stream: Stream;
  boost?: Boost;
  time?: {
    startedAt?: string;
    finishAt?: string;
  }
}

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
    choseStream: (state, { payload: stream }: PayloadAction<Stream>) => {
      state.chosedStream = stream;
    },
    startStream: (state, { payload: { stream, boost } }: PayloadAction<StartStreamProps>) => {
      state.startedAt = moment().toISOString();
      const duration = stream.duration * (boost?.settings.durationMultiply ?? 1);
      state.finishAt = moment(state.startedAt).add(duration, 'minutes').toISOString();
      state.isDisabled = false;
      state.isPaused = false;
      state.isStarted = true;
      state.isAvailableToStart = false;
      state.activeStream = stream;
      state.farmedPoints = 0;
      state.hasBanned = false;
    },
    increaseFarmedPoints: (state, action: PayloadAction<number>) => {
      state.farmedPoints = Number(state.farmedPoints) + Number(action.payload);
    },
    realoadStream: (state, { payload: { stream, time } }: PayloadAction<StartStreamProps>) => {
      state.startedAt = time?.startedAt;
      state.finishAt = time?.finishAt;
      state.isDisabled = false;
      state.isStarted = true;
      state.isAvailableToStart = false;
      state.activeStream = stream;
      state.isFinish = false;
    },
    finishStream: (state) => {
      state.startedAt = undefined;
      state.finishAt = undefined;
      state.isDisabled = true;
      state.isStarted = false;
      state.isFinish = true;
      state.isBanned = false;
      state.isPaused = false;
      state.hasBanned = false;
      state.activeStream = undefined;
    },
    pauseStream: (state) => {
      state.isPaused = true;
    },
    continueStream: (state) => {
      state.isPaused = true;
    },
    getBun: (state) => {
      state.isBanned = true;
      state.isPaused = true;
      state.hasBanned = true;
    },
    getUnbunned: (state) => {
      state.isBanned = false;
      state.isPaused = false;
    },
    openStreamsModal: (state) => {
      state.streamsModalIsOpen = true
    },
    closeStreamsModal: (state) => {
      state.streamsModalIsOpen = false
      state.chosedStream = undefined
    },
  },
  extraReducers: (builder) => builder,
});

export const { actions: gameActions } = gameSlice;
export const { reducer: gameReducer } = gameSlice;
