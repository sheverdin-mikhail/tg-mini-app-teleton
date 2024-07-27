import { ReactNode } from 'react';
import { RoutePath } from '@/shared/config/RouteConfig/appRouteConfig';

export interface IBottomNavbarItem {
    text: string
    image?: ReactNode
    path: string
}

export const navbarItems: IBottomNavbarItem[] = [
  {
    text: 'Main',
    path: RoutePath.main,
  },
  {
    text: 'Earn',
    path: RoutePath.earn,
  },
  {
    text: 'Boost',
    path: RoutePath.boost,
  },
  {
    text: 'Invite',
    path: RoutePath.invite,
  },
];
