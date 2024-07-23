import GameLevelImage from 'shared/assets/img/game/level_1.png';
import clsx from 'clsx';
import {
  useState, useEffect, useCallback,
} from 'react';
import debounce from 'lodash.debounce';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserStreamDurationMinutes, getUserTotalPoins, userActions } from 'entities/User';
import { useSelector } from 'react-redux';
import { useUserData } from 'shared/lib/hooks/useUserData/useUserData';
import { gameActions } from 'features/Game/model/slice/gameSlice';
import { GameTouch } from '../GameTouch/GameTouch';
import cls from './GameLevel.module.scss';
import { useSavePoints } from '../../api/gameApi';
import { getGameIsAvaiableToStart, getGameIsDisabled, getGameIsInit } from '../../model/selectors/gameSelector';

interface GameLevelProps {
    className?: string;
}

export const GameLevel: React.FC<GameLevelProps> = (props) => {
  const { className } = props;
  const [touches, setTouches] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const [savePointsMutation] = useSavePoints();
  const totalPoints = useSelector(getUserTotalPoins);
  const isDisabled = useSelector(getGameIsDisabled);
  const streamDurationMinutes = useSelector(getUserStreamDurationMinutes);
  const isAvailableToStart = useSelector(getGameIsAvaiableToStart);
  const { isInit: userIsInit } = useUserData();
  const gameIsInit = useSelector(getGameIsInit);

  const handleTouchStart = useCallback((event: any) => {
    if (!isDisabled) {
      setTouches(event.touches);
      dispatch(userActions.increaseUserPoints(1));
    } else if (isAvailableToStart && streamDurationMinutes) {
      dispatch(gameActions.startGame({ streamDurationMinutes }));
    }
  }, [dispatch, isAvailableToStart, isDisabled, streamDurationMinutes]);

  const savePoints = useCallback(debounce(() => {
    if (userIsInit) {
      savePointsMutation(totalPoints);
    }
  }, 2000), [totalPoints]);

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
      <img className={cls.image} src={GameLevelImage} alt="" />
      {Array.from(touches).map((touch, index) => (
        <GameTouch key={`${index + touch.clientX}`} touch={touch} />
      ))}
    </div>
  );
};
