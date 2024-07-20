import { Quest } from 'entities/Quest';
import { rtkApi } from 'shared/api/rtkApi';
import { QuestListResponse } from '../types/questsList';

export const questsListApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getQuestsList: build.query<QuestListResponse, null>({
      query: () => ({
        url: '/earn/quests/',
      }),
      providesTags: ['Quest'],
    }),
    verifyQuest: build.mutation<Quest, string>({
      query: (questId) => ({
        url: `/earn/quests/${questId}/`,
        method: 'POST',
      }),
      invalidatesTags: ['Quest'],
    }),
    claimQuest: build.mutation<Quest, string>({
      query: (questId) => ({
        url: `/earn/quests/${questId}/claim/`,
        method: 'POST',
      }),
      invalidatesTags: ['Quest'],
    }),
  }),
});

export const useQuestsList = questsListApi.useGetQuestsListQuery;
export const useQuestVerify = questsListApi.useVerifyQuestMutation;
export const useQuestClaim = questsListApi.useClaimQuestMutation;
