import { Stream, StreamsList } from 'entities/Stream';
import clsx from 'clsx';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import {
  getUserBoosts,
  applyUserBoost,
  getCurrentAvailableStreamsCount,
} from 'entities/User';
import cls from './GameStreams.module.scss';
import { gameActions } from '../../model/slice/gameSlice';
import { getGameIsStarted } from '../../model/selectors/gameSelector';
import { useStartGame } from '../../api/gameApi';

interface GameStreamsProps {
    className?: string;
}

export const GameStreams: React.FC<GameStreamsProps> = (props) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const isStarted = useSelector(getGameIsStarted);
  const userBoosts = useSelector(getUserBoosts);
  const [startGameMutation] = useStartGame();
  const availableStreams = useSelector(getCurrentAvailableStreamsCount);

  const handleTouchStart = useCallback((stream: Stream) => {
    const boost = userBoosts?.find((boost) => Object.hasOwn(boost?.settings ?? {}, 'durationMultiply'));
    if (boost) {
      startGameMutation({ stream, boost });
      dispatch(gameActions.startStream({
        stream,
        boost,
      }));
      dispatch(applyUserBoost(boost));
    } else {
      startGameMutation({ stream });
      dispatch(gameActions.startStream({
        stream,
      }));
    }
  }, [dispatch, userBoosts, startGameMutation]);

  // reload stream on reconnection
  // useEffect(() => {
  //   if (userGameTime && userActiveStream) {
  //     const now = moment();
  //     if (now.isBefore(moment(userGameTime.finishAt))) {
  //       dispatch(gameActions.realoadStream({
  //         stream: userActiveStream,
  //         time: userGameTime,
  //       }));
  //     }
  //   }
  // }, [userGameTime, dispatch, userActiveStream, userBoosts]);

  return (
    <div className={clsx(cls.gameStreams, {}, [className])}>
      <StreamsList onClick={handleTouchStart} disabled={isStarted || availableStreams === 0} />
    </div>
  );
};
