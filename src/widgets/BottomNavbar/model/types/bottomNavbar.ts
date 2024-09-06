import {  SVGProps, VFC } from 'react';
import { RoutePath } from '@/shared/config/RouteConfig/appRouteConfig';
import MainIcon from '@/shared/assets/icons/main-icon.svg';
import EarnIcon from '@/shared/assets/icons/earn-icon.svg';
import BoostIcon from '@/shared/assets/icons/boost-icon.svg';
import InviteIcon from '@/shared/assets/icons/invite-icon.svg';
import SoonIcon from '@/shared/assets/icons/coming-soon-icon.svg';


export interface IBottomNavbarItem {
    text: string
    image: VFC<SVGProps<SVGElement>>
    path: string
    soon?: boolean
}

export const navbarItems: IBottomNavbarItem[] = [
  {
    text: 'Main',
    image: MainIcon,
    path: RoutePath.main,
  },
  {
    text: 'Earn',
    image: EarnIcon,
    path: RoutePath.earn,
  },
  {
    text: 'Boost',
    image: BoostIcon,
    path: RoutePath.boost,
  },
  {
    text: 'Invite',
    image: InviteIcon,
    path: RoutePath.invite,
  },
  {
    text: 'Coming soon',
    path: '/coming-soon',
    image: SoonIcon,
    soon: true,
  },
];

