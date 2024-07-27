import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { Boost } from '@/entities/Boost';
import { User } from '../types/user';

export const applyUserBoost = createAsyncThunk<
    Pick<User, 'boosts'>,
    Boost,
    ThunkConfig<string>
>(
  'user/applyUserBoost',
  async (boost, {
    extra, rejectWithValue,
  }) => {
    try {
      const response = await extra.api.post<Pick<User, 'boosts'>>(
        '/user/apply-boost/',
        {
          boost,
        },
      );

      if (!response.data) {
        throw Error('Ошибка получения информации о пользователе');
      }
      return response.data;
    } catch (e: any) {
      return rejectWithValue('Ошибка авторизации пользвателя');
    }
  },
);
