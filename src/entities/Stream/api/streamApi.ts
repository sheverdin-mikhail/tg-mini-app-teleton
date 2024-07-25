import { rtkApi } from 'shared/api/rtkApi';
import { Stream } from '../model/types/stream';

const streamApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getStreamsList: build.query<Stream[], void>({
      query: () => ({
        url: '/games/streams/',
        method: 'GET',
      }),
      providesTags: ['Stream'],
    }),
  }),
});

export const useGetStreamsList = streamApi.useGetStreamsListQuery;
