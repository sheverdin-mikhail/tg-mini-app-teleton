export interface Boost {
    id: number;
    title: string;
    description: string;
    cost: number;
    settings: BoostSettings;
}

export interface BoostSettings {
    durationMultiply?: number;
    additionalStreamsCount?: number;
    banDefence?: boolean;
}
