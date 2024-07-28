import { Boost } from "@/entities/Boost";

export interface LootBox {
    id: string;
    prices: number[];
}

export interface LootBoxRewardSettings {
    amount?: number;
    boost: Boost;
}

export interface LootBoxReward {
    id: string;
    lootBoxId: string;
    title: string;
    type: string;
    settings: LootBoxRewardSettings;
    value?: Boost | number;
}