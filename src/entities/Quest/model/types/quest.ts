export interface QuestSettings {
    link: string;
    title: string;
    action: string;
    header: string;
    buttonTitle: string;
    description: string;
    skipChecking: boolean;
}

export interface Quest {
    id: string;
    section: string;
    settings: QuestSettings;
    status: string;
}
