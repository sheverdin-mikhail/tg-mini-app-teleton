import { Level } from 'entities/Level';
import { Stream } from 'entities/Stream';

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

    startedAt?: string;
    finishAt?: string;
    activeStream?: Stream;
}
