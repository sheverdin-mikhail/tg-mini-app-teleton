import { Boost } from '@/entities/Boost';
import { DailyReward } from '@/entities/DailyReward';
import { Level } from '@/entities/Level';
import { Referral } from '@/entities/Referral';
import { Stream } from '@/entities/Stream';
import { User as TGUser } from '@telegram-apps/sdk';

export interface JWTTokenData {
    token: string
}

export interface UserDailyReward {
    lastReward: DailyReward;
    rewardDate: Date;
}

export interface UserBoost{
    isPurchased?: boolean;
    totalUseCount?: number;
    dailyUseCount?: number;
}

export interface BoostWithUserBoost extends Boost {
    user_boost: UserBoost;
}

export interface User extends TGUser {
    totalPoints: number;
    referrals?: Referral[];
    referalCode?: string;
    daily_reward: DailyReward | undefined;
    lastClaimDailyReward: Date | undefined;
    availableToClaimDailyRewardDate: Date | undefined;
    level: Level | undefined;
    boosts?: BoostWithUserBoost[];
    currentAvailableStreamsCount?: number;
    maxAvailableStreamsCount?: number;
    earnIncomePerDay?: number;
    

    lastSyncAt?: string;
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
