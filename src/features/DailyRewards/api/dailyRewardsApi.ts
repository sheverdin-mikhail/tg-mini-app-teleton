import { DailyReward } from 'entities/DailyReward';
import { User, userActions } from 'entities/User';
import { rtkApi } from 'shared/api/rtkApi';

const dailyRewardsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getDailyRewardsList: build.query<DailyReward[], void>({
      query: () => ({
        url: '/earn/daily-rewards/',
        method: 'GET',
      }),
      providesTags: ['DailyReward'],
    }),
    claimDailyReward: build.mutation<User, Pick<DailyReward, 'id'>>({
      query: (dailyId) => ({
        url: '/earn/daily-rewards/claim/',
        method: 'POST',
        body: {
          ...dailyId,
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userActions.setUser(data));
        } catch (e) {
          console.error(e);
        }
      },
    }),
  }),
});

export const useGetDailyRewardsList = dailyRewardsApi.useGetDailyRewardsListQuery;
export const useClaimDailyRewards = dailyRewardsApi.useClaimDailyRewardMutation;
