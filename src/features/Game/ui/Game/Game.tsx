import clsx from 'clsx';
import {
  useState, useEffect, useCallback,
} from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserTotalPoins, userActions } from 'entities/User';
import debounce from 'lodash.debounce';
import { useSelector } from 'react-redux';
import { useUserData } from 'shared/lib/hooks/useUserData/useUserData';
import cls from './Game.module.scss';
import { useSavePoints } from '../../api/gameApi';
import { GameTouch } from '../GameTouch/GameTouch';

interface GameProps {
  className?: string;
}

export const Game: React.FC<GameProps> = (props) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const [touches, setTouches] = useState<any[]>([]);
  const [savePointsMutation] = useSavePoints();
  const totalPoints = useSelector(getUserTotalPoins);
  const { isInit: userIsInit } = useUserData();

  const handleTouchStart = (event: any) => {
    setTouches(event.touches);
    dispatch(userActions.increaseUserPoints(1));
  };

  const savePoints = useCallback(debounce(() => {
    if (userIsInit) {
      savePointsMutation(totalPoints);
    }
  }, 1000), [totalPoints]);

  useEffect(() => {
    savePoints();
    return () => {
      savePoints.cancel();
    };
  }, [savePoints, userIsInit]);

  return (
    <div
      className={clsx(cls.game, {}, [className])}
      onTouchStart={handleTouchStart}
    >
      {Array.from(touches).map((touch, index) => (
        <GameTouch key={`${index + touch.clientX}`} touch={touch} />
      ))}
    </div>
  );
};
