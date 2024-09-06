import { Stream, StreamsList } from '@/entities/Stream';
import clsx from 'clsx';
import { useCallback, useMemo} from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import {
  applyUserBoost,
  getCurrentAvailableStreamsCount,
  getUserBoosts,
  makeGetUserBoost,
} from '@/entities/User';
import { getGameChosedStream, getGameIsStarted, getGameStreamsModalIsOpen } from '../../model/selectors/gameSelector';
import { gameActions } from '../../model/slice/gameSlice';
import { Modal } from '@/shared/ui/Modal/Modal';
import { StateSchema } from '@/app/providers';
import { useNavigate } from 'react-router-dom';
import { FontSize, FontWeight, Text, TextColor } from '@/shared/ui/Text/Text';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import StreamsModalImage from '@/shared/assets/img/live.png';
import { useStartGame } from '../../api/gameApi';
import EnergyIcon from '@/shared/assets/img/energy.png'
import DefenceIcon from '@/shared/assets/img/defence.png'
import cls from './GameStreams.module.scss';


interface GameStreamsProps {
  className?: string;
}

export const GameStreams: React.FC<GameStreamsProps> = (props) => {
  const { className, } = props;
  const dispatch = useAppDispatch();
  const isStarted = useSelector(getGameIsStarted);
  const availableStreams = useSelector(getCurrentAvailableStreamsCount);
  const getBoost = makeGetUserBoost();
  const advancedStream = useSelector((state: StateSchema) => getBoost(state, '2'))
  const defenceBoost = useSelector((state: StateSchema) => getBoost(state, '3'))
  const userBoosts = useSelector(getUserBoosts);
  const energyBoost = useMemo(() => userBoosts?.find((boost) => Object.keys((boost?.settings ?? {})).includes('durationMultiply')), [userBoosts]);
  const [startGameMutation, {isLoading}] = useStartGame();
  const isOpen = useSelector(getGameStreamsModalIsOpen);
  const navigate = useNavigate();
  const stream = useSelector(getGameChosedStream);


  const onStartHandler = useCallback(() => {
    if (stream) {
      if (energyBoost?.user_boost.isPurchased) {
        startGameMutation({ stream, boost: energyBoost });
        dispatch(gameActions.startStream({
          stream,
          boost: energyBoost,
        }));
        dispatch(applyUserBoost(energyBoost));
      } else {
        startGameMutation({ stream });
        dispatch(gameActions.startStream({
          stream,
        }));
      }
    }
  }, [dispatch, startGameMutation, stream, energyBoost]);

  const handleTouch = useCallback((stream: Stream) => {
    dispatch(gameActions.choseStream(stream));
  }, [dispatch]);

  const onStartStreamHandler = () => {
    onStartHandler()
    dispatch(gameActions.closeStreamsModal())
  }

  const onBuyStreamClick = () => {
    dispatch(gameActions.closeStreamsModal());
    navigate('/boost')
  }



  if (availableStreams === 0 && !advancedStream?.isPurchased) {
    return (
      <>
        {
        !isStarted && <Button onClick={() => dispatch(gameActions.openStreamsModal())}>Start streaming</Button>
        }
        <Modal className={clsx(cls.gameStreams, {}, [className])} isOpen={isOpen} onClose={() => dispatch(gameActions.closeStreamsModal())}>
          <div className={cls.titleRow}>
            <Text size={FontSize.XL} weight={FontWeight.MEDIUM} className={cls.title}>You have 0 streams available.</Text>
            <Text size={FontSize.LG} color={TextColor.SECONDARY} className={cls.title}>Buy an additional stream or come back later</Text>
          </div>
          <div className={cls.buttons}>
            <Button onClick={onBuyStreamClick}>Buy stream</Button>
          </div>
        </Modal>
      </>
    )
  } else if (availableStreams === 0 && advancedStream?.isPurchased) {
    return (
      <>
        {
        !isStarted && <Button onClick={() => dispatch(gameActions.openStreamsModal())}>Start streaming</Button>
        }
        <Modal className={clsx(cls.gameStreams, {}, [className])} isOpen={isOpen} onClose={() => dispatch(gameActions.closeStreamsModal())}>
          <div className={cls.titleRow}>
            <Text size={FontSize.XL} weight={FontWeight.MEDIUM} className={cls.title}>You have 0 streams available.</Text>
            <Text size={FontSize.LG} color={TextColor.SECONDARY} className={cls.title}>Сome back later</Text>
          </div>
          <div className={cls.buttons}>
            <Button onClick={() => dispatch(gameActions.closeStreamsModal())}>OK</Button>
          </div>
        </Modal>
      </>
    )
  }


  return (
    <>
      {
       !isStarted && <Button onClick={() => dispatch(gameActions.openStreamsModal())}>Start streaming</Button>
      }
      <Modal className={clsx(cls.gameStreams, {}, [className])} isOpen={isOpen} onClose={() => dispatch(gameActions.closeStreamsModal())}>
        <img src={StreamsModalImage} className={cls.img} />
        <div className={cls.titleRow}>
          <Text size={FontSize.XL} weight={FontWeight.MEDIUM} className={cls.title}>Select the type of stream</Text>
          {
            stream && <Text size={FontSize.LG} color={TextColor.SECONDARY}>This stream is {stream?.duration} minute long</Text>
          }
        </div>
        <StreamsList onClick={handleTouch} disabled={isStarted || availableStreams === 0} />

        {
          (defenceBoost?.isPurchased || energyBoost?.user_boost.isPurchased) && (
            <div className={cls.boosts}>
              <Text className={cls.boostsTitle} color={TextColor.SECONDARY} size={FontSize.LG}>Boosts</Text>
              {energyBoost?.user_boost.isPurchased && <Text 
                className={cls.boostsItem} 
                size={FontSize.LG} 
                weight={FontWeight.MEDIUM}
              >
                <img src={EnergyIcon} className={cls.boostsIcon} />
                Increase your stream duration x1.5
              </Text>}
              {defenceBoost?.isPurchased && <Text 
                className={cls.boostsItem} 
                size={FontSize.LG} 
                weight={FontWeight.MEDIUM}
            >
              <img src={DefenceIcon} className={cls.boostsIcon} />
              Protects againts ban
            </Text>}
            </div>
          )
        }

        <div className={cls.buttons}>
          <Button onClick={onStartStreamHandler} disabled={!stream || isLoading} loading={isLoading}>Go live</Button>
          <Button onClick={() => dispatch(gameActions.closeStreamsModal())} theme={ButtonTheme.SECONDARY}>Not now</Button>
        </div>
      </Modal>
    </>
  );
};
