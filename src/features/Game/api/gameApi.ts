import { rtkApi } from 'shared/api/rtkApi';

const gameApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    savePoints: build.mutation<number, number>({
      query: (points) => ({
        url: '/games/save-points/',
        method: 'POST',
        body: {
          points,
        },
      }),
    }),
  }),
});

export const useSavePoints = gameApi.useSavePointsMutation;
