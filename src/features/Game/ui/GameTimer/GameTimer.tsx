import { Timer } from 'shared/ui/Timer/Timer';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import {
  useCallback,
  useMemo,
  useState,
} from 'react';
import moment from 'moment';
import { Text } from '@telegram-apps/telegram-ui';
import { getCurrentAvailableStreamsCount } from 'entities/User';
import cls from './GameTimer.module.scss';
import {
  getGameIsStarted,
  getGameTime,
} from '../../model/selectors/gameSelector';
import { GameFinishModal } from '../GameFinishModal/GameFinishModal';

interface GameTimerProps {
    className?: string;
}

export const GameTimer: React.FC<GameTimerProps> = (props) => {
  const { className } = props;

  const gameTime = useSelector(getGameTime);
  const isStarted = useSelector(getGameIsStarted);
  const availableStreams = useSelector(getCurrentAvailableStreamsCount);
  const [finishModalIsOpen, setFinishModalIsOpen] = useState(false);

  const time = useMemo(() => {
    if ((!gameTime.startedAt || !gameTime.finishAt) && isStarted) {
      return { minutes: 0, seconds: 0 };
    }

    const now = moment();
    const duration = moment.duration(moment(gameTime.finishAt).diff(now));

    const minutes = Math.floor(duration.asMinutes());
    const seconds = Math.floor(duration.asSeconds() % 60);

    return {
      minutes,
      seconds,
    };
  }, [gameTime, isStarted]);

  const onTimerFinishHandler = useCallback(() => {
    setFinishModalIsOpen(true);
  }, []);

  const onModalCloseHandler = useCallback(() => {
    setFinishModalIsOpen(false);
  }, []);

  return (
    <div className={clsx(cls.gameTimer, {}, [className])}>
      {
        !isStarted
          ? <Text weight="1" caps> <span className={cls.text}>{availableStreams} available streams</span> </Text>
          : <Timer time={time} onFinish={onTimerFinishHandler} />
      }
      <GameFinishModal isOpen={finishModalIsOpen} onClose={onModalCloseHandler} />
    </div>
  );
};
