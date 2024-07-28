import { LootBoxReward } from "@/entities/LootBox"

export interface LootBoxSchema {
    isOpen: boolean
    isError?: boolean
    error?: string
    lootboxes?: LootBoxReward[]

}