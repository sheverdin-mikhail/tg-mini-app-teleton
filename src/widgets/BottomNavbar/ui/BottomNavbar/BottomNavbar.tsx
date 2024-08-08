import clsx from 'clsx';
import { SegmentedControl } from '@telegram-apps/telegram-ui';
import { useLocation } from 'react-router-dom';
import cls from './BottomNavbar.module.scss';
import { navbarItems } from '../../model/types/bottomNavbar';
import { BottomNavbarItem } from '../BottomNavbarItem/BottomNavbarItem';

interface BottomNavbarProps {
    className?: string;
}

export const BottomNavbar: React.FC<BottomNavbarProps> = (props) => {
  const { className } = props;

  const { pathname } = useLocation();

  return (
    <div className={clsx(cls.bottomNavbar, {}, [className])}>
      <SegmentedControl className={cls.tabList}>
        {
          navbarItems.map((item) => (
            <BottomNavbarItem className={cls.item} item={item} key={item.path} selected={pathname === item.path} />
          ))
        }
      </SegmentedControl>
    </div>
  );
};
