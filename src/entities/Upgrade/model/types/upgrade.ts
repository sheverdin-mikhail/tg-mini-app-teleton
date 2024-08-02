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