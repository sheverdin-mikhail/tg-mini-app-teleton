import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocationSchema } from '../types/location';
import { Level } from '@/entities/Level';

const initialState: LocationSchema = {
  isInit: false,
  isLoading: false,
  isError: false,
  error: '',
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    initLocation: (state, action: PayloadAction<Level[]>) => {
      state.isInit = true;
      state.locations = action.payload;
      state.curLocation = action.payload[0];
    },
    nextLocation: (state) => {
        const nextLocation = state.locations?.find(location => (state.curLocation?.level ?? 1) + 1 === location.level) ?? state.locations?.[0];
        state.curLocation = nextLocation
    },
    prevLocation: (state) => {
        const nextLocation = state.locations?.find(location => (state.curLocation?.level ?? 1) - 1 === location.level) ?? state.locations?.[0];
        state.curLocation = nextLocation
    },
  },
});

export const { actions: locationActions } = locationSlice;
export const { reducer: locationReducer } = locationSlice;
