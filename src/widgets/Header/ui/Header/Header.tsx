import { useTelegram } from 'shared/lib/hooks/useTelegram/useTelegram';
import clsx from 'clsx';
import {
  Avatar, Caption, Text,
} from '@telegram-apps/telegram-ui';
import { GameLevelProgress } from 'features/Game';
import cls from './Header.module.scss';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = (props) => {
  const { className } = props;
  const { tgUser } = useTelegram();

  return (
    <header className={clsx(cls.header, {}, [className])}>
      <div className={cls.block}>
        <Avatar src={tgUser?.photoUrl} className={cls.avatar} />
        <div className={clsx(cls.userLabel, cls.col)}>
          <Caption weight="2" caps>Streamers Producer</Caption>
          <Text weight="2" caps>{tgUser?.firstName}</Text>
        </div>
      </div>
      <div className={cls.block}>
        <GameLevelProgress />
      </div>
    </header>
  );
};
