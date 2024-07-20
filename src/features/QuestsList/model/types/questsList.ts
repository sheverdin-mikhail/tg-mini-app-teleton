import { Quest } from 'entities/Quest';

export interface QuestListResponse {
    data: Quest[];
    success: boolean;
}
