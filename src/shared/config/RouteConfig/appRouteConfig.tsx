import { RouteProps } from 'react-router-dom';
import { BoostPage } from '@/pages/BoostPage';
import { EarnPage } from '@/pages/EarnPage';
import { InvitePage } from '@/pages/InvitePage';
import { LoadingPage } from '@/pages/LoadingPage';
import { MainPage } from '@/pages/MainPage';
import { LocationPage } from '@/pages/LocationPage';
import { DailyRewardDetailPage } from '@/pages/DailyRewardDetailPage';
import { LootboxDetailPage } from '@/pages/LootboxDetailPage';

export type AppRouteProps = RouteProps & {
  authOnly?: boolean;
  withoutNavbar?: boolean;
}

// global routing

export enum AppRoutes {
  MAIN = 'main',
  EARN = 'earn',
  BOOST = 'boost',
  INVITE = 'invite',
  LOADING = 'loading',
  LOCATION = 'location',
  DAILY_REWARD = 'daily_reward',
  LOOT_BOX = 'loot_box',

  // NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.EARN]: '/earn',
  [AppRoutes.BOOST]: '/boost',
  [AppRoutes.INVITE]: '/invite',
  [AppRoutes.LOADING]: '/loading',
  [AppRoutes.LOCATION]: '/location',
  [AppRoutes.DAILY_REWARD]: '/daily',
  [AppRoutes.LOOT_BOX]: '/lootbox/:lootboxId/:lootboxCount',


  // [AppRoutes.NOT_FOUND]: '/*',
};
//-----------------------------------------------------------------------------------

//------------------------------------------------------------------------------------

// Routing config

export const routeConfig: Record<AppRoutes, AppRouteProps> = {

  // No Private pages

  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
    authOnly: true,
  },
  [AppRoutes.EARN]: {
    path: RoutePath.earn,
    element: <EarnPage />,
    authOnly: true,
  },
  [AppRoutes.BOOST]: {
    path: RoutePath.boost,
    element: <BoostPage />,
    authOnly: true,
  },
  [AppRoutes.INVITE]: {
    path: RoutePath.invite,
    element: <InvitePage />,
    authOnly: true,
  },
  [AppRoutes.LOCATION]: {
    path: RoutePath.location,
    element: <LocationPage />,
    authOnly: true,
    withoutNavbar: true,
  },
  [AppRoutes.DAILY_REWARD]: {
    path: RoutePath.daily_reward,
    element: <DailyRewardDetailPage />,
    authOnly: true,
    withoutNavbar: true,
  },
  [AppRoutes.LOOT_BOX]: {
    path: RoutePath.loot_box,
    element: <LootboxDetailPage />,
    authOnly: true,
    withoutNavbar: true,
  },
  [AppRoutes.LOADING]: {
    path: RoutePath.loading,
    element: <LoadingPage />,
    authOnly: false,
    withoutNavbar: true,
  },

  // [AppRoutes.NOT_FOUND]: {
  //   path: RoutePath.not_found,
  //   element: <NotFoundPage />,
  //   authOnly: false,
  //   sawatzkyOnly: false,
  // },
};
