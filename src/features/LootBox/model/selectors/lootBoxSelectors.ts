import { StateSchema } from "@/app/providers";
import { createSelector } from "@reduxjs/toolkit";

export const getLootBox = (state: StateSchema) => state.lootBox;
export const getLootBoxIsOpen = (state: StateSchema) => state.lootBox?.isOpen;
export const getLootBoxItems = (state: StateSchema) => state.lootBox?.lootboxes;
export const getLootBoxIsError = (state: StateSchema) => state.lootBox?.isError;
export const getLootBoxError = createSelector(getLootBox, (modal) => ({
    isError: modal.isError,
    error: modal.error
}))

