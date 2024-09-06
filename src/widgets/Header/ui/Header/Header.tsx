import { useTelegram } from '@/shared/lib/hooks/useTelegram/useTelegram';
import clsx from 'clsx';
import { GameLevelProgress } from '@/features/Game';
import AvatarImage from '@/shared/assets/img/avatar.png';
import cls from './Header.module.scss';
import { FontWeight, Text } from '@/shared/ui/Text/Text';
import { useSelector } from 'react-redux';
import { getEarnIncomePerDay } from '@/entities/User';
import { formatNumber } from '@/shared/lib/utils/formatNumber';
import { PointsBadge, PointsBadgeSize } from '@/shared/ui/PointsBadge/PointsBadge';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  className?: string;
}


export const Header: React.FC<HeaderProps> = (props) => {
  const { className } = props;
  const { tgUser } = useTelegram();
  const incomePerDay = useSelector(getEarnIncomePerDay)
  const navigate = useNavigate();

  return (
      <header className={clsx(cls.header, {}, [className])}>
        <div className={cls.block}>
          <img src={tgUser?.photoUrl ?? AvatarImage} className={cls.avatar} />
          <div className={cls.col}>
            <Text className={cls.headerName}>Streamers Producer <Text weight={FontWeight.BOLD} className={cls.name}>{tgUser?.firstName}</Text></Text>
            <Text weight={FontWeight.MEDIUM} className={cls.headerName}>profit per day <PointsBadge size={PointsBadgeSize.SMALL}>{formatNumber(incomePerDay?.toString() ?? '0')}</PointsBadge></Text>
          </div>
        </div>
        <GameLevelProgress onClick={() => navigate('location')} />
      </header>
  );
};
