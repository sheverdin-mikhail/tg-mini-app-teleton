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
    savePoints: build.mutation<User, number>({
      query: (points) => ({
        url: '/games/save-points/',
        method: 'POST',
        body: {
          points,
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
    levelUp: build.mutation<User, void>({
      query: () => ({
        url: '/games/level-up/',
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

export const useSavePoints = gameApi.useSavePointsMutation;
export const useStartGame = gameApi.useStartGameMutation;
export const useLevelUp = gameApi.useLevelUpMutation;
