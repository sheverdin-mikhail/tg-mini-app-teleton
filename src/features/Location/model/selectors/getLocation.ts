import { StateSchema } from "@/app/providers";

export const getLocation = (state: StateSchema) => state.location;
export const getLocationCurLocation = (state: StateSchema) => state.location?.curLocation;
export const getLocationIsInit = (state: StateSchema) => state.location?.isInit;

