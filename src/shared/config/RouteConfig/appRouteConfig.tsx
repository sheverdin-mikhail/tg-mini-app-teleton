import { RouteProps } from 'react-router-dom';
import { BoostPage } from '@/pages/BoostPage';
import { EarnPage } from '@/pages/EarnPage';
import { InvitePage } from '@/pages/InvitePage';
import { LoadingPage } from '@/pages/LoadingPage';
import { MainPage } from '@/pages/MainPage';

export type AppRouteProps = RouteProps & {
  authOnly?: boolean;
}

// global routing

export enum AppRoutes {
  MAIN = 'main',
  EARN = 'earn',
  BOOST = 'boost',
  INVITE = 'invite',
  LOADING = 'loading'
  // NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.EARN]: '/earn',
  [AppRoutes.BOOST]: '/boost',
  [AppRoutes.INVITE]: '/invite',
  [AppRoutes.LOADING]: '/loading',

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

  [AppRoutes.LOADING]: {
    path: RoutePath.loading,
    element: <LoadingPage />,
    authOnly: false,
  },

  // [AppRoutes.NOT_FOUND]: {
  //   path: RoutePath.not_found,
  //   element: <NotFoundPage />,
  //   authOnly: false,
  //   sawatzkyOnly: false,
  // },
};
