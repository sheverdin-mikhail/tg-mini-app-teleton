import EnergyIcon from '@/shared/assets/img/energy.png';
import DefenceIcon from '@/shared/assets/img/defence.png';
import StreamIcon from '@/shared/assets/img/live.png';


export interface Boost {
    id: string;
    title: string;
    description: string;
    cost: number;
    settings: BoostSettings;
    type: BoostType;
}

export interface BoostSettings {
    durationMultiply?: number;
    additionalStreamsCount?: number;
    banDefence?: boolean;
}

export enum BoostType {
    ENERGY = 'energy',
    STREAM = 'stream',
    DEFENCE = 'defence',
}


export const BoostIcon: Record<BoostType, any> = {
  [BoostType.ENERGY]: EnergyIcon,
  [BoostType.DEFENCE]: DefenceIcon,
  [BoostType.STREAM]: StreamIcon,
}