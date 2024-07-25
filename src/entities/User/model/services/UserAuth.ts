import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { USER_LOCALSTORAGE_TOKEN } from 'shared/const/localStorage';

export const CreateToken = createAsyncThunk<
    string,
    string,
    ThunkConfig<string>
>(
  'user/createToken',
  async (initData, { extra, rejectWithValue }) => {
    try {
      const tokensResponse = await extra.api.post<any>('/auth/', { initData });
      if (!tokensResponse.data) {
        throw new Error('Ошибка авторизации пользователя');
      }
      const { token } = tokensResponse.data.data;
      if (token) {
        localStorage.setItem(USER_LOCALSTORAGE_TOKEN, token);
      }
      return token;
    } catch (e: any) {
      if (e.response.status === 401) {
        return rejectWithValue('Ошибка авторизации пользователя');
      }
      return rejectWithValue('Ошибка авторизации пользвателя');
    }
  },
);
