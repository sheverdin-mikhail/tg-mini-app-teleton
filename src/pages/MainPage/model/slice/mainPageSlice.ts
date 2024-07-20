import { createSlice } from '@reduxjs/toolkit';
import { MainPageSchema } from '../types/mainPage';

const initialState: MainPageSchema = {
  isInit: false,
  isLoading: false,
};

export const mainPageSlice = createSlice({
  name: 'mainPage',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => builder,
});

export const { actions: mainPageActions } = mainPageSlice;
export const { reducer: mainPageReducer } = mainPageSlice;
