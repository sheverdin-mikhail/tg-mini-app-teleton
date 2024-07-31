import { useTelegram } from '@/shared/lib/hooks/useTelegram/useTelegram';
import clsx from 'clsx';
import {
  Avatar, Caption, Text,
} from '@telegram-apps/telegram-ui';
import { GameLevelProgress } from '@/features/Game';
import { UpLevelConditionsModal } from '@/features/UpLevelConditions';
import { useRef } from 'react';
import AvatarImage from '@/shared/assets/img/logo.jpg';
import cls from './Header.module.scss';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = (props) => {
  const { className } = props;
  const { tgUser } = useTelegram();
  const trigger = useRef(null);
  return (
    <>
      <header className={clsx(cls.header, {}, [className])}>
        <div className={cls.block}>
          <Avatar src={tgUser?.photoUrl ?? AvatarImage} className={cls.avatar} />
          <div className={clsx(cls.userLabel, cls.col)}>
            <Caption weight="2" caps>Streamers Producer</Caption>
            <Text weight="2" caps className={cls.name}>{tgUser?.firstName}</Text>
          </div>
        </div>
        <UpLevelConditionsModal trigger={(
          <div className={cls.block} ref={trigger}>
            <GameLevelProgress />
          </div>
        )}
        />
      </header>
    </>
  );
};
