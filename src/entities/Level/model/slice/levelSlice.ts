import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Level, LevelsSchema } from '../types/level';
import { fetchLevelsList } from '../services/fetchLevelsList';

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
    initLevels: (state, action: PayloadAction<Level[]>) => {
      state.isInit = true;
      state.levels = action.payload;
    },
  },
  extraReducers: (builder) => builder
  // Получение списка уровней
    .addCase(fetchLevelsList.pending, (state) => {
      state.error = '';
      state.isLoading = true;

    })
    .addCase(fetchLevelsList.fulfilled, (state, action: PayloadAction<Level[]>) => {
      state.isLoading = false;
      state.isInit = true;
      state.levels = action.payload;
      state.isError = false;
      state.isInit = true;
    })
    .addCase(fetchLevelsList.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.isLoading = false;
      state.error = action.payload ?? '';
      state.isError = true;
      state.isInit = true;
    }),
});

export const { actions: levelsActions } = levelsSlice;
export const { reducer: levelsReducer } = levelsSlice;
