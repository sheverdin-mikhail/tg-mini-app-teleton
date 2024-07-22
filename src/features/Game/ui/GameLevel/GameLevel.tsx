import GameLevelImage from 'shared/assets/img/game/level_1.png';
import clsx from 'clsx';
import {
  useState, useEffect, useCallback,
} from 'react';
import debounce from 'lodash.debounce';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserTotalPoins, userActions } from 'entities/User';
import { useSelector } from 'react-redux';
import { useUserData } from 'shared/lib/hooks/useUserData/useUserData';
import { GameTouch } from '../GameTouch/GameTouch';
import cls from './GameLevel.module.scss';
import { useSavePoints } from '../../api/gameApi';

interface GameLevelProps {
    className?: string;
}

export const GameLevel: React.FC<GameLevelProps> = (props) => {
  const { className } = props;
  const [touches, setTouches] = useState<any[]>([]);
  const dispatch = useAppDispatch();
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
  }, 2000), [totalPoints]);

  useEffect(() => {
    savePoints();
    return () => {
      savePoints.cancel();
    };
  }, [savePoints, userIsInit]);

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
