export enum QuestStatus {
    START = 'Start',
    CLAIM = 'Claim',
    DONE = 'Done'
}

export enum QuestIcon {
    TELEGRAM = 'telegram',
    TWITTER = 'twitter',
    ENERGY = 'energy',
    STREAM = 'stream',
}

export interface QuestSettings extends Record<string, any> {
    link?: string;
    title: string;
    action: string;
    header: string;
    buttonTitle: string;
    description: string;
    skipChecking: boolean;
    count?: number;
    boostId?: string;
    iconType?: QuestIcon;
}

export interface Quest {
    id: string;
    section: string;
    settings: QuestSettings;
    status: QuestStatus;
    reward?: number;
}