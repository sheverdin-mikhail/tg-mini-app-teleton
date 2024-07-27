import { Boost } from '@/entities/Boost';
import { DailyReward } from '@/entities/DailyReward';
import { Level } from '@/entities/Level';
import { Referal } from '@/entities/Referal';
import { Stream } from '@/entities/Stream';

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
    referrals?: Referal[];
    referalCode?: string;
    daily_reward: DailyReward | undefined;
    lastClaimDailyReward: Date | undefined;
    availableToClaimDailyRewardDate: Date | undefined;
    level: Level | undefined;
    boosts?: Boost[];
    currentAvailableStreamsCount?: number;
    maxAvailableStreamsCount?: number;

    gameStartedAt?: string;
    gameFinishAt?: string;
    activeStream?: Stream;
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
