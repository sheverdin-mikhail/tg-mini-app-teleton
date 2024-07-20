import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { USER_LOCALSTORAGE_TOKEN } from 'shared/const/localStorage';
import axios from 'axios';
import { JWTTokenData } from '../types/user';

export const CreateToken = createAsyncThunk<
    JWTTokenData,
    string,
    ThunkConfig<string>
>(
  'user/createToken',
  async (initData, { extra, rejectWithValue }) => {
    try {
      console.log('before');
      console.log(initData);
      console.log('http://localhost:8000/api/auth/');
      const tokensResponse = await axios.post<JWTTokenData>('http://localhost:8000/api/auth/', { initData });
      console.log('after');
      console.log(tokensResponse);
      if (!tokensResponse.data) {
        throw new Error('Ошибка авторизации пользователя');
      }
      const { token } = tokensResponse.data;
      if (token) {
        localStorage.setItem(USER_LOCALSTORAGE_TOKEN, token);
      }
      return tokensResponse.data;
    } catch (e: any) {
      console.log(e);
      if (e.response.status === 401) {
        return rejectWithValue('Ошибка авторизации пользователя');
      }
      return rejectWithValue('Ошибка авторизации пользвателя');
    }
  },
);
