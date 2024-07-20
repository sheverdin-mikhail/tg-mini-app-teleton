import { rtkApi } from 'shared/api/rtkApi';

export const questsListApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getQuestsList: build.query({
      query: () => ({
        url: '/earn/quests/',
      }),
    }),
  }),
});

export const useQuestsList = questsListApi.useGetQuestsListQuery;
