import { Quest } from '@/entities/Quest';
import { rtkApi } from '@/shared/api/rtkApi';
import { QuestListResponse } from '../model/types/questsList';
import { User, userActions } from '@/entities/User';

interface ClaimResponse {
  success: boolean
  user: User
  quest: Quest
}

const questsListApi = rtkApi.injectEndpoints({
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
    claimQuest: build.mutation<ClaimResponse, string>({
      query: (questId) => ({
        url: `/earn/quests/${questId}/claim/`,
        method: 'POST',
      }),
      invalidatesTags: ['Quest'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { user } = data;
          dispatch(userActions.setUser(user));
        } catch (e) {
          console.error(e);
        }
      },
    }),    
  }),
});

export const useQuestsList = questsListApi.useGetQuestsListQuery;
export const useQuestVerify = questsListApi.useVerifyQuestMutation;
export const useQuestClaim = questsListApi.useClaimQuestMutation;
