import { LootBox, LootBoxReward } from '@/entities/LootBox';
import { User, userActions } from '@/entities/User';
import { rtkApi } from '@/shared/api/rtkApi';
import { lootBoxActions } from '../model/slice/lootBox';

interface BuyLootBoxResponse {
  succes: boolean,
  user: User,
  lootboxes: LootBoxReward[],
}

interface BuyLootBoxRequestParams {
  id: LootBox['id'],
  count: number,
}

const lootBoxApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getLootBoxLists: build.query<LootBox[], void>({
      query: () => ({
        url: '/lootBox/',
      }),
    }),
    buyLootBox: build.mutation<BuyLootBoxResponse, BuyLootBoxRequestParams>({
      query: ({id, count}) => ({
        url: `/lootBox/${id}/`,
        method: 'POST',
        body: {
          count
        }
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userActions.setUser(data.user));
          dispatch(lootBoxActions.openModal(data.lootboxes));
        } catch (e) {
          console.error(e);
        }
      },
    }),
  }),
});

export const useGetLootBoxList = lootBoxApi.useGetLootBoxListsQuery;
export const useBuyLootBox = lootBoxApi.useBuyLootBoxMutation;

