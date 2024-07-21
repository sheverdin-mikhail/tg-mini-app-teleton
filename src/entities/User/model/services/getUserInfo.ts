import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { User } from '../types/user';

interface UserInfoResponse {
    success: boolean;
    data: User;
}

export const getUserInfo = createAsyncThunk<
    User,
    void,
    ThunkConfig<string>
>(
  'user/getUserInfo',
  async (_, {
    extra, rejectWithValue,
  }) => {
    try {
      const response = await extra.api.get<UserInfoResponse>('/user/');

      if (!response.data.success) {
        throw Error('Ошибка получения информации о пользователе');
      }
      return response.data.data;
    } catch (e: any) {
      return rejectWithValue('Ошибка авторизации пользвателя');
    }
  },
);
