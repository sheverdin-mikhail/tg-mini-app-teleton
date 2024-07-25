import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { Level } from '../types/level';

export const fetchLevelsList = createAsyncThunk<
    Level[],
    void,
    ThunkConfig<string>
>(
  'level/fetchLevelsList',
  async (_, {
    extra, rejectWithValue,
  }) => {
    try {
      const response = await extra.api.get<Level[]>('/games/levels/');

      return response.data;
    } catch (e: any) {
      return rejectWithValue('Ошибка получения списка уровней');
    }
  },
);
