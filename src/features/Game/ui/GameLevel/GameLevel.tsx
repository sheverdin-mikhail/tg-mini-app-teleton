import clsx from 'clsx';
import {
  useState, useEffect, useCallback, useRef,
} from 'react';
import debounce from 'lodash.debounce';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserCurrentLevel, getUserTotalPoins, userActions } from '@/entities/User';
import { useSelector } from 'react-redux';
import { useUserData } from '@/shared/lib/hooks/useUserData/useUserData';
import { GameTouch } from '../GameTouch';
import cls from './GameLevel.module.scss';
import { useSavePoints } from '../../api/gameApi';
import { getGameIsDisabled, getGameIsInit, getGameIsPaused, getGameStream } from '../../model/selectors/gameSelector';
import { GameBackground } from '../GameBackground/GameBackground';
import { gameActions } from '../../model/slice/gameSlice';
import { GameBunModal } from '../GameBunModal/GameBunModal';

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
  const gameIsInit = useSelector(getGameIsInit);
  const stream = useSelector(getGameStream);
  const isPaused = useSelector(getGameIsPaused);

  // Устанавливаем максимальное количество хранимых тапов
  const MAX_TOUCHES = 50;

  const handleTouchStart = useCallback((event: any) => {
    if (!isDisabled && stream && !isPaused) {
      const newTouches = [...event.touches].slice(0, MAX_TOUCHES);
      setTouches((prev) => [...prev.slice(-MAX_TOUCHES + newTouches.length), ...newTouches]);
      touchesRef.current = [...touchesRef.current.slice(-MAX_TOUCHES + newTouches.length), ...newTouches];

      dispatch(userActions.increaseUserPoints(1));
      dispatch(gameActions.increaseFarmedPoints(1));
    }
  }, [dispatch, isDisabled, stream, isPaused]);

  // Удаляем тапы из состояния по окончанию анимации
  const handleAnimationEnd = (touch: any) => {
    setTouches((prev) => prev.filter(t => t.identifier !== touch.identifier));
    touchesRef.current = touchesRef.current.filter(t => t.identifier !== touch.identifier);
  };

  // eslint-disable-next-line
  const savePoints = useCallback(debounce(() => {
    if (userIsInit) {
      savePointsMutation(totalPoints);
    }
  }, 2000), [userIsInit, totalPoints]);

  useEffect(() => {
    if (gameIsInit && userIsInit) {
      savePoints();
    }
    return () => {
      savePoints.cancel();
    };
  }, [savePoints, userIsInit, gameIsInit]);

  return (
    <div
      className={clsx(cls.level, {}, [className])}
      onTouchStart={handleTouchStart}
    >
      <GameBackground level={userLevel?.level} />
      {touches.map((touch, index) => (
        <GameTouch
          touch={touch}
          key={`${touch.identifier}_${index}`}
          onRemove={() => handleAnimationEnd(touch)}
        />
      ))}
      <GameBunModal />
    </div>
  );
};
