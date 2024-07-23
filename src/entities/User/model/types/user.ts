import { DailyReward } from 'entities/DailyReward';
import { Level } from 'entities/Level';
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
    complitedDailyTasksCount?: number;
    referrals?: Referal[];
    referalCode?: string;
    daily_reward: DailyReward | undefined;
    lastClaimDailyReward: Date | undefined;
    availableToClaimDailyRewardDate: Date | undefined;
    level: Level | undefined;
    streamDurationMinutes?: number;
    dailyRewardStreak?: number;
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
