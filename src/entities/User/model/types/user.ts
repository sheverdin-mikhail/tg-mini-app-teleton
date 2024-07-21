import { DailyReward } from 'entities/DailyReward';
import { Referal } from 'entities/Referal';

export interface JWTTokenData {
    token: string
}

export interface UserDailyReward {
    lastReward: DailyReward;
    rewardDate: Date;
}

export interface User {
    id?: number;
    totalPoints: number;
    referals?: Referal[];
    referalCode?: string;
    complitedDailyTasksCount?: number;
    dailyReward: UserDailyReward | undefined;
}

export interface UserSchema {
    isLoading: boolean;
    isInit: boolean;
    token?: JWTTokenData;
    error: string;
    user: User;
}

export interface UserAuthData {
    success: boolean;
    data: JWTTokenData
}
