import { Boost } from 'entities/Boost';
import { Stream } from 'entities/Stream';
import { User, userActions } from 'entities/User';
import { rtkApi } from 'shared/api/rtkApi';

interface StartGameProps {
  stream: Stream;
  boost?: Boost;
}

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
    startGame: build.mutation<User, StartGameProps>({
      query: ({ stream, boost }) => ({
        url: '/games/start/',
        method: 'POST',
        body: {
          stream,
          boost,
        },
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

export const useSavePoints = gameApi.useSavePointsMutation;
export const useStartGame = gameApi.useStartGameMutation;
