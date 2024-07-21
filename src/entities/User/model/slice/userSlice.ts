import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserSchema } from '../types/user';
import { getUserInfo } from '../services/getUserInfo';

const initialState: UserSchema = {
  isInit: false,
  isLoading: false,
  error: '',
  user: {
    totalPoints: 0,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    initUser: (state) => {
      state.isInit = true;
    },
    increaseUserPoints: (state, action: PayloadAction<number>) => {
      state.user.totalPoints = Number(state.user.totalPoints) + action.payload;
    },
  },
  extraReducers: (builder) => builder
  // Аунтификация пользователя
    .addCase(getUserInfo.pending, (state, action) => {
      state.error = '';
      state.isLoading = true;
    })
    .addCase(getUserInfo.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.isInit = true;
      state.user = action.payload;
    })
    .addCase(getUserInfo.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.isLoading = false;
      state.error = action.payload ?? '';
    }),
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
