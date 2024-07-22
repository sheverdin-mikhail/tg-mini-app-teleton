export interface Level {
    level: number;
    pointToNextLevel: number;
    referralsToNextLevel: number;
    tasksToNextLevel: number;
}

export interface LevelsSchema {
    levels: Level[];
    isLoading: boolean;
    isError: boolean;
    isInit: boolean;
    error: string;
}
