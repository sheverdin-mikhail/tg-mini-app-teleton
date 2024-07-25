export interface Level {
    level: number;
    pointToNextLevel: number;
}

export interface LevelsSchema {
    levels: Level[];
    isLoading: boolean;
    isError: boolean;
    isInit: boolean;
    error: string;
}
