import { Boost } from '@/entities/Boost';
import { User, userActions } from '@/entities/User';
import { rtkApi } from '@/shared/api/rtkApi';

const BoostsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getBoostsList: build.query<Boost[], void>({
      query: () => ({
        url: '/boosts/',
        method: 'GET',
      }),
      providesTags: ['Boost'],
    }),
    buyBoost: build.mutation<User, Boost['id']>({
      query: (id) => ({
        url: `/boosts/${id}/`,
        method: 'POST',
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
    claimBoost: build.mutation<User, Boost['id']>({
      query: (id) => ({
        url: `/boosts/${id}/claim/`,
        method: 'POST',
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

export const useGetBoostsList = BoostsApi.useGetBoostsListQuery;
export const useBuyBoost = BoostsApi.useBuyBoostMutation;
export const useClaimBoost = BoostsApi.useClaimBoostMutation;
