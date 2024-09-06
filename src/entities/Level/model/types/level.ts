import LevelImage1 from '@/shared/assets/img/game/level_1.png';
import LevelImage2 from '@/shared/assets/img/game/level_2.png';
import LevelImage3 from '@/shared/assets/img/game/level_3.png';


export interface Level {
    level: number;
    pointToNextLevel: number;
    name: string;
    description: string;
}

export interface LevelsSchema {
    levels: Level[];
    isLoading: boolean;
    isError: boolean;
    isInit: boolean;
    error: string;
}


export const LevelImages: Record<Level['level'], string> = {
    1: LevelImage1,
    2: LevelImage2,
    3: LevelImage3,
}
