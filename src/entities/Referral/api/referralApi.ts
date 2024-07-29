import { rtkApi } from '@/shared/api/rtkApi';
import { Referral, ReferralFriend } from '../model/types/referral';


const referralApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getReferralData: build.query<Referral, void>({
      query: () => ({
        url: '/referral/',
        method: 'GET',
      }),
      providesTags: ['Referral']
    }),
    getFriendsList: build.query<ReferralFriend[], void>({
        query: () => ({
          url: '/referral/frens/list/',
          method: 'GET',
        }),
      }),
  }),
});

export const useGetReferralData = referralApi.useGetReferralDataQuery;
export const useGetFriendsList = referralApi.useGetFriendsListQuery;

