import { Level } from "@/entities/Level";

export interface LocationSchema {
    isLoading: boolean;
    isInit: boolean;
    isError: boolean;
    error: string;
    locations?: Level[];
    curLocation?: Level;
}