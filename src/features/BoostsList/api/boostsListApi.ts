import { Boost } from 'entities/Boost';
import { User, userActions } from 'entities/User';
import { rtkApi } from 'shared/api/rtkApi';

const BoostsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getBoostsList: build.query<Boost[], void>({
      query: () => ({
        url: '/boosts/',
        method: 'GET',
      }),
      providesTags: ['Boost'],
    }),
    buyBoost: build.mutation<User, Pick<Boost, 'id'>>({
      query: (boost) => ({
        url: `/boosts/${boost.id}/`,
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
