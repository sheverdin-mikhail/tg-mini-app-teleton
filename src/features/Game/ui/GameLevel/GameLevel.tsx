import clsx from 'clsx';
import {
  useState, useEffect, useCallback,
} from 'react';
import debounce from 'lodash.debounce';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserCurrentLevel, getUserTotalPoins, userActions } from 'entities/User';
import { useSelector } from 'react-redux';
import { useUserData } from 'shared/lib/hooks/useUserData/useUserData';
import { GameTouch } from '../GameTouch/GameTouch';
import cls from './GameLevel.module.scss';
import { useSavePoints } from '../../api/gameApi';
import { getGameIsDisabled, getGameIsInit, getGameStream } from '../../model/selectors/gameSelector';
import { GamePoints } from '../GamePoints/GamePoints';
import { GameBackground } from '../GameBackground/GameBackground';

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
  const { isInit: userIsInit } = useUserData();
  const userLevel = useSelector(getUserCurrentLevel);
  const gameIsInit = useSelector(getGameIsInit);
  const stream = useSelector(getGameStream);

  const handleTouchStart = useCallback((event: any) => {
    if (!isDisabled && stream) {
      setTouches(event.touches);
      dispatch(userActions.increaseUserPoints(stream.pointsMultiplier));
    }
  }, [dispatch, isDisabled, stream]);

  const savePoints = debounce(() => {
    if (userIsInit) {
      savePointsMutation(totalPoints);
    }
  }, 2000);

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
      <GamePoints className={cls.gamePoints} />
      <GameBackground level={userLevel?.level} />
      {Array.from(touches).map((touch, index) => (
        <GameTouch key={`${index + touch.clientX}`} touch={touch} />
      ))}
    </div>
  );
};
