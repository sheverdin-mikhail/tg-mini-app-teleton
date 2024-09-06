import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import cls from './BottomNavbar.module.scss';
import { navbarItems } from '../../model/types/bottomNavbar';
import { BottomNavbarItem } from '../BottomNavbarItem/BottomNavbarItem';

interface BottomNavbarProps {
  className?: string;
  hidden?: boolean;
}

export const BottomNavbar: React.FC<BottomNavbarProps> = (props) => {
  const { className, hidden = false } = props;

  const { pathname } = useLocation();

  if (hidden) {
    return null
  }

  return (
    <nav className={clsx(cls.bottomNavbar, {}, [className])}>
      {
        navbarItems.map((item) => (
          <BottomNavbarItem className={cls.item} item={item} key={item.path} selected={pathname === item.path} disabled={item.soon} />
        ))
      }
    </nav>
  );
};
