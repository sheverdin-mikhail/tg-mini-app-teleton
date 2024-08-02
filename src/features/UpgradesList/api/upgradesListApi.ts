import { Upgrade } from '@/entities/Upgrade';
import { User, userActions } from '@/entities/User';
import { rtkApi } from '@/shared/api/rtkApi';


interface BuyUpgradeArgs {
  id: Upgrade['id']
  level: Upgrade['level']
}

interface BuyUpgradeResponse {
  user: User
  upgradesForBuy: Upgrade
}

const upgradesApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getUpgradesList: build.query<Upgrade[], void>({
      query: () => ({
        url: '/boosts/upgrades/upgrades-for-buy/',
      }),
      providesTags: ['Upgrades']
    }),
    buyUpgrade: build.mutation<BuyUpgradeResponse, BuyUpgradeArgs>({
      query: (args) => ({
        url: '/boosts/upgrades/buy-upgrade/',
        method: "POST",
        body: args
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { user } = data; 
          dispatch(userActions.setUser(user));
        } catch (e) {
          console.error(e);
        }
      },
      invalidatesTags: ['Upgrades']
    }),
  }),
});

export const useGetUpgradesList = upgradesApi.useGetUpgradesListQuery;
export const useBuyUpgrade = upgradesApi.useBuyUpgradeMutation;
