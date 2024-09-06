import clsx from 'clsx';
import {
  useState, useEffect, useCallback, useRef,
} from 'react';
import debounce from 'lodash.debounce';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserCurrentLevel, getUserTotalPoins, userActions } from '@/entities/User';
import { useSelector } from 'react-redux';
import { useUserData } from '@/shared/lib/hooks/useUserData/useUserData';
import cls from './GameLevel.module.scss';
import { useSavePoints } from '../../api/gameApi';
import { 
  getGameActiveStream,
  getGameIsDisabled, 
  getGameIsPaused, 
  getGameIsStarted,  
} from '../../model/selectors/gameSelector';
import { GameBackground } from '../GameBackground/GameBackground';
import { gameActions } from '../../model/slice/gameSlice';
import { GameBunModal } from '../GameBunModal/GameBunModal';
import LiveLablelImage from '@/shared/assets/img/live.png';
import OfflineLablelImage from '@/shared/assets/img/offline.png';
import { GameTouchContent } from '../GameTouchContent/GameTouchContent';
import { useSpringRef, useTransition } from '@react-spring/web';
import { TapHelper } from '../TapHelper/TapHelper';
import { GamePoints } from '../GamePoints/GamePoints';

interface GameLevelProps {
  className?: string;
}

export const GameLevel: React.FC<GameLevelProps> = (props) => {
  const { className } = props;
  const [touches, setTouches] = useState<any[]>([]);
  const touchesRef = useRef<any[]>([]);
  const dispatch = useAppDispatch();
  const [savePointsMutation] = useSavePoints();
  const totalPoints = useSelector(getUserTotalPoins);
  const isDisabled = useSelector(getGameIsDisabled);
  const { isInit: userIsInit } = useUserData();
  const userLevel = useSelector(getUserCurrentLevel);
  const stream = useSelector(getGameActiveStream);
  const isPaused = useSelector(getGameIsPaused);
  const gameIsStarted = useSelector(getGameIsStarted);
  const transitionRef = useSpringRef();
  const transitions = useTransition(touches, {
    ref: transitionRef,
    key: (item: any) => item.identifier,
    from: { translateY: 0, opacity: 1 },
    enter: { translateY: -200, opacity: 0 },
    leave: { translateY: -200, opacity: 0 },
    config: {
      easing: (x: any) => {
        return Math.sqrt(1 - Math.pow(x - 1, 2));
      },
      duration: 1500,
    },
    onRest: (_style: any, _: any, item: any) => {
      handleAnimationEnd(item);
    },
  });

  // Дебаунс для сохранения очков
  const debouncedSavePoints = useRef(
    debounce(() => {
      if (userIsInit && gameIsStarted) {
        savePointsMutation(totalPoints);
      }
    }, 2000)
  ).current;

  const handleTouchStart = useCallback(
    (event: any) => {
      if (!isDisabled && gameIsStarted && !isPaused) {
        const newTouches = Array.from(event.touches);
        setTouches(newTouches);

        dispatch(userActions.increaseUserPoints(1));
        dispatch(gameActions.increaseFarmedPoints(1));

        // Сброс дебаунса при каждом тапе
        debouncedSavePoints();
      } else {
        dispatch(gameActions.openStreamsModal())
      }
    },
    [dispatch, isDisabled, stream, isPaused, debouncedSavePoints]
  );

  const handleAnimationEnd = useCallback((touch: any) => {
    setTouches((prev) => prev.filter((t) => t.identifier !== touch.identifier));
    touchesRef.current = touchesRef.current.filter((t) => t.identifier !== touch.identifier);
  }, []);

  useEffect(() => {
    return () => {
      // Очистка таймера при размонтировании компонента
      debouncedSavePoints.cancel();
    };
  }, [debouncedSavePoints]);

  useEffect(() => {
    transitionRef.start();
  }, [touches]);

  return (
    <div className={clsx(cls.level, {}, [className])} onTouchStart={handleTouchStart}>
      <img src={gameIsStarted ? LiveLablelImage : OfflineLablelImage} className={cls.live} />
      <GameBackground online={gameIsStarted} level={userLevel?.level} />
      <GamePoints className={cls.points} />
      <div>
        {transitions((anime, touch) => (
          <GameTouchContent touch={touch} anime={anime} key={touch.identifier} />
        ))}
      </div>
      <GameBunModal />
      <TapHelper />
    </div>
  );
};