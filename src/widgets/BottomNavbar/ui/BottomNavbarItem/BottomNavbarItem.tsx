import { MouseEventHandler, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IBottomNavbarItem } from '../../model/types/bottomNavbar';
import clsx from 'clsx';
import { Icon } from '@/shared/ui/Icon/Icon';
import cls from './BottomNavbarItem.module.scss'

interface BottomNavbarItemProps {
  className?: string;
  selected: boolean;
  item: IBottomNavbarItem;
  disabled?: boolean;
}

export const BottomNavbarItem: React.FC<BottomNavbarItemProps> = (props) => {
  const { selected = false, item, className, disabled = false } = props;

  const navigate = useNavigate();

  const onClickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    navigate(item.path);
  }, [navigate, item.path]);

  return (
    <button 
      disabled = {disabled}
      className={clsx(cls.item, className, {
        [cls.active]: selected
      })} 
      onClick={onClickHandler}
    >
      <Icon Svg={item.image} className={cls.icon} />
      <span className={cls.text}>
        {item.text}
      </span>
    </button>
  );
};
