import { Level } from 'entities/Level';

export interface Game {
    level: Level;
    points: number;
}

export interface GameSchema {
    isLoading: boolean;
    isInit: boolean;
}
