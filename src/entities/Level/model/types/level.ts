export interface Level {
    level: number;
    pointToNextLevel: number;
    referalsToNextLevel: number;
    tasksToNextLevel: number;
    imgUrl: string;
}

export interface LevelsSchema {
    levels: Level[];
    isLoading: boolean;
    isError: boolean;
    isInit: boolean;
    error: string;
}
