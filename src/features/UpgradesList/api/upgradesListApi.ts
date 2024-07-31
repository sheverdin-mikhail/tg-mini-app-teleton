import { Upgrade } from '@/entities/Upgrade';
import { rtkApi } from '@/shared/api/rtkApi';


const upgradesApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getUpgradesList: build.query<Upgrade[], void>({
      query: () => ({
        url: '/boosts/upgrades-for-buy/',
      }),
      providesTags: ['Upgrades']
    }),
  }),
});

export const useGetUpgradesList = upgradesApi.useGetUpgradesListQuery;
