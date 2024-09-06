import { Timer } from '@/shared/ui/Timer/Timer';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import {
  useCallback,
  useMemo,
  useState,
} from 'react';
import moment from 'moment';
import { getCurrentAvailableStreamsCount, makeGetUserBoost } from '@/entities/User';
import {
  getGameIsPaused,
  getGameIsStarted,
  getGameTime,
} from '../../model/selectors/gameSelector';
import { GameFinishModal } from '../GameFinishModal/GameFinishModal';
import { FontSize, FontWeight, Text } from '@/shared/ui/Text/Text';
import EnergyImage from '@/shared/assets/img/energy.png';
import EnergyDisabledImage from '@/shared/assets/img/energy-disabled.png';
import DefenceImage from '@/shared/assets/img/defence.png';
import DefenceDisabledImage from '@/shared/assets/img/defence-disabled.png';
import { StateSchema } from '@/app/providers';
import cls from './GameTimer.module.scss';



interface GameTimerProps {
  className?: string;
}

export const GameTimer: React.FC<GameTimerProps> = (props) => {
  const { className } = props;

  const gameTime = useSelector(getGameTime);
  const isStarted = useSelector(getGameIsStarted);
  const availableStreams = useSelector(getCurrentAvailableStreamsCount);
  const [finishModalIsOpen, setFinishModalIsOpen] = useState(false);
  const isPaused = useSelector(getGameIsPaused);
  const getUserBoost = makeGetUserBoost();
  const energyBooster = useSelector((state: StateSchema) => getUserBoost(state, '1'))
  const defenceBooster = useSelector((state: StateSchema) => getUserBoost(state, '3'))

  
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
          ? <div className={cls.row}>
              <Text className={cls.text} weight={FontWeight.MEDIUM} size={FontSize.LG}>Available streams <Text weight={FontWeight.BOLD} size={FontSize.LG}>({availableStreams})</Text></Text>
              <div className={cls.boosts}>
                <img src={energyBooster?.isPurchased ? EnergyImage : EnergyDisabledImage} />
                <img src={defenceBooster?.isPurchased ? DefenceImage : DefenceDisabledImage} />
              </div>
            </div>
          : <div className={cls.timerBlock}>
              <Text className={cls.timerText}>Tap quickly to make the most of the given time</Text>
              <Timer className={cls.timer} isPaused={isPaused} time={time} onFinish={onTimerFinishHandler} />
          </div>
      }
      <GameFinishModal isOpen={finishModalIsOpen} onClose={onModalCloseHandler} />
    </div>
  );
};
