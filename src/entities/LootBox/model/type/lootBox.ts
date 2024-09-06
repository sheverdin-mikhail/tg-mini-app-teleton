import { Boost } from "@/entities/Boost";

export enum LootboxType {
    POINTS = 'points',
    BOOST = 'boost' 
} 

export interface LootBox {
    id: string;
    prices: number[];
    lootBoxRewards: LootBoxReward[];
}

export interface LootBoxRewardSettings {
    amount?: number;
    boostId: Boost['id'];
}

export interface LootBoxReward {
    id: string;
    lootBoxId: string;
    title: string;
    type: LootboxType;
    settings: LootBoxRewardSettings;
    value?: Boost | number;
}

