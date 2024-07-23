import { Level } from 'entities/Level';

export interface Game {
    level: Level;
    points: number;
}

export interface GameSchema {
    isLoading: boolean;
    isInit: boolean;
    isDisabled: boolean;
    isStarted: boolean;
    isFinish: boolean;
    isAvailableToStart: boolean;
    startAvailableAt?: string;

    startedAt?: string;
    finishAt?: string;
}
