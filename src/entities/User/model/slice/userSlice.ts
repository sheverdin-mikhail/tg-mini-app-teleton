import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserSchema } from '../types/user';
import { getUserInfo } from '../services/getUserInfo';
import { applyUserBoost } from '../services/applyUserBoost';

const initialState: UserSchema = {
  isInit: false,
  isLoading: false,
  error: '',
  user: {
    totalPoints: 0,
    daily_reward: undefined,
    level: undefined,
    lastClaimDailyReward: undefined,
    availableToClaimDailyRewardDate: undefined,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = { ...state.user, ...action.payload };
    },
    initUser: (state) => {
      state.isInit = true;
    },
    increaseUserPoints: (state, action: PayloadAction<number>) => {
      state.user.totalPoints = Number(state.user.totalPoints) + Number(action.payload);
    },
    claimDailyReward: (state, action: PayloadAction<Pick<User, 'daily_reward' | 'lastClaimDailyReward' | 'totalPoints' | 'availableToClaimDailyRewardDate'>>) => {
      state.user.totalPoints = action.payload.totalPoints;
      state.user.daily_reward = action.payload.daily_reward;
      state.user.lastClaimDailyReward = action.payload.lastClaimDailyReward;
      state.user.availableToClaimDailyRewardDate = action.payload.availableToClaimDailyRewardDate;
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
      state.user = { ...state.user, ...action.payload };
    })
    .addCase(getUserInfo.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.isLoading = false;
      state.error = action.payload ?? '';
    })
    // Использование буста
    .addCase(applyUserBoost.pending, (state, action) => {
      state.error = '';
    })
    .addCase(applyUserBoost.fulfilled, (state, action: PayloadAction<Pick<User, 'boosts'>>) => {
      state.user.boosts = action.payload.boosts;
    })
    .addCase(applyUserBoost.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.isLoading = false;
      state.error = action.payload ?? '';
    }),
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
