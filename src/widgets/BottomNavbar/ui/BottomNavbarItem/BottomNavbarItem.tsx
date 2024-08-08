import { MouseEventHandler, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { SegmentedControlItem } from '@telegram-apps/telegram-ui/dist/components/Navigation/SegmentedControl/components/SegmentedControlItem/SegmentedControlItem';
import { IBottomNavbarItem } from '../../model/types/bottomNavbar';

interface BottomNavbarItemProps {
    className?: string;
    selected: boolean;
    item: IBottomNavbarItem;
}

export const BottomNavbarItem: React.FC<BottomNavbarItemProps> = (props) => {
  const { selected = false, item, className } = props;

  const navigate = useNavigate();

  const onClickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    navigate(item.path);
  }, [navigate, item.path]);

  return (
    <SegmentedControlItem className={className} onClick={onClickHandler} selected={selected}>
      {item.text}
    </SegmentedControlItem>
  );
};
