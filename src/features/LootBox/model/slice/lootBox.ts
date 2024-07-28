import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LootBoxSchema } from '../types/lootBox';
import { LootBoxReward } from '@/entities/LootBox';
import { LOOTBOX_REWARDS_LOCALSTORAGE } from '@/shared/const/localStorage';

const initialState: LootBoxSchema = {
  isOpen: false,
  error: '',
};

export const lootBoxSlice = createSlice({
  name: 'lootBox',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<LootBoxReward[]>) => {
      state.isOpen = true;
      state.lootboxes = action.payload;
      localStorage.setItem(LOOTBOX_REWARDS_LOCALSTORAGE, JSON.stringify(action.payload));
    },
    closeModal: (state) => {
      state.isOpen = false
      localStorage.removeItem(LOOTBOX_REWARDS_LOCALSTORAGE)
    },
  },
  extraReducers: (builder) => builder
});

export const { actions: lootBoxActions } = lootBoxSlice;
export const { reducer: lootBoxReducer } = lootBoxSlice;
