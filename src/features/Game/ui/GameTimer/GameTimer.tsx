import { Timer } from 'shared/ui/Timer/Timer';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import moment from 'moment';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text } from '@telegram-apps/telegram-ui';
import cls from './GameTimer.module.scss';
import {
  getGameIsAvaiableToStart,
  getGameIsFinish,
  getGameIsStarted,
  getGameTime,
} from '../../model/selectors/gameSelector';
import { gameActions } from '../../model/slice/gameSlice';

interface GameTimerProps {
    className?: string;
}

export const GameTimer: React.FC<GameTimerProps> = (props) => {
  const { className } = props;

  const gameTime = useSelector(getGameTime);
  const isFinish = useSelector(getGameIsFinish);
  const availableToStart = useSelector(getGameIsAvaiableToStart);
  const dispatch = useAppDispatch();

  const time = useMemo(() => {
    if (!gameTime.startedAt || !gameTime.finishAt) {
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
  }, [gameTime]);

  const onFinishHandler = useCallback(() => {
    dispatch(gameActions.finishGame());
  }, [dispatch]);

  return (
    <div className={clsx(cls.gameTimer, {}, [className])}>
      {
        availableToStart
          ? <Text className={cls.text} weight="1"> Stream is ready to START! </Text>
          : (isFinish && !availableToStart)
            ? <Text className={cls.text} weight="1"> Stream is over :( take a rest! </Text>
            : <Timer time={time} onFinish={onFinishHandler} />
      }

    </div>
  );
};
