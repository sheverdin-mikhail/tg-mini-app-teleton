export interface Upgrade {
    id: string
    title: string
    level: number
    cost: number
    currentIncomePerDay: number
    incomePerDayDelta: number
    isAvailable: boolean
    maxLevel: number
}


export enum UpgradeIcon {
    TALISMAN = 'talisman',
    MICROPHONE ='microphone',
    NEON_LIGHTS ='neon_lights',
    RECORDING_A_STREAM ='recording_a_stream',
    COMPUTER_UPGRADE ='computer_upgrade'

}