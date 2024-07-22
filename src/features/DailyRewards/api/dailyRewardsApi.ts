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
          dispatch(userActions.claimDailyReward({
            totalPoints: data.totalPoints,
            daily_reward: data.daily_reward,
            lastClaimDailyReward: data.lastClaimDailyReward,
            availableToClaimDailyRewardDate: data.availableToClaimDailyRewardDate,
          }));
        } catch (e) {
          console.log(e);
        }
      },
      invalidatesTags: ['DailyReward'],
    }),
  }),
});

export const useGetDailyRewardsList = dailyRewardsApi.useGetDailyRewardsListQuery;
export const useClaimDailyRewards = dailyRewardsApi.useClaimDailyRewardMutation;
