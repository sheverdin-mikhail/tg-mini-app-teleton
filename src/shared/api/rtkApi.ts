import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { USER_LOCALSTORAGE_TOKEN } from '@/shared/const/localStorage';

// Define a service using a base URL and expected endpoints
export const rtkApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(USER_LOCALSTORAGE_TOKEN) || '';
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Quest', 'DailyReward', 'Boost', 'Stream', 'Referral', 'Upgrades'],
  endpoints: () => ({
  }),
});
