import { createSlice } from '@reduxjs/toolkit';
import { UserSchema } from '../types/user';

const initialState: UserSchema = {
  isInit: false,
  isLoading: false,
  data: {
    isNew: true,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => builder,
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
