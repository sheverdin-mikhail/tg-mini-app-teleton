export interface GameLevel {
    level: number;
    pointToNextLevel: number;
    referalsToNextLevel: number;
    imgUrl: string;
}

export interface Game {
    level: GameLevel;
    points: number;
}

export interface GameSchema {
    isLoading: boolean;
    isInit: boolean;
}
