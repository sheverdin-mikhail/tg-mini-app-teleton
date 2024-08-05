import { Level } from '@/entities/Level';
import { Stream } from '@/entities/Stream';

export interface Game {
    level: Level;
    points: number;
}

export enum GameTapEventType {
    COMMENT = "comment",
    EMOJI = "emoji",
    BAN = "ban",
    VIEW = "view",
}

export interface GameTapEvent {
    chance: number
    type: GameTapEventType
}

export interface GameSchema {
    isLoading: boolean;
    isInit: boolean;
    isDisabled: boolean;
    isStarted: boolean;
    isFinish: boolean;
    isPaused?: boolean;
    isAvailableToStart: boolean;
    isBanned?: boolean;
    hasBanned?: boolean;

    startedAt?: string;
    finishAt?: string;
    activeStream?: Stream;
    farmedPoints: number;
    gameTapEvents: GameTapEvent[];
}
