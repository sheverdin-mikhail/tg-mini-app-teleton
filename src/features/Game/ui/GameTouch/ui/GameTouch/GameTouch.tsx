import { useEffect, useState } from 'react';
import { getRandomGameTapEvent } from '../../../../model/services/getRandomGameTapEvent';
import { useSelector } from 'react-redux';
import { getGameFinishAt, getGameStartedAt, getGameTapEvents } from '../../../../model/selectors/gameSelector';
import moment from 'moment';
import { GameTapEvent, GameTapEventType } from '../../../../model/types/game';
import { GameTouchCircle } from '../GameTouchCircle/GameTouchCircle';
import { GameTouchContent } from '../GameTouchContent/GameTouchContent';

interface GameTouchProps {
  className?: string;
  touch: any;
  onRemove?: (touch: any) => void
}

export const GameTouch: React.FC<GameTouchProps> = (props) => {
  const { touch, onRemove } = props;
  const gameTapEvents = useSelector(getGameTapEvents)
  const gameStartedAt = useSelector(getGameStartedAt)
  const gameFinishAt = useSelector(getGameFinishAt)
  const [tapEvent, setTapEvent] = useState<GameTapEvent | null>(null) 


  const handleTouchEvent = () => {
    if (gameFinishAt && gameStartedAt) {
      const now = moment();
      const gameStart = moment(gameStartedAt);
      const gameFinish = moment(gameFinishAt);
      
      // Первые и последние 20 секунд игры
      const first20Seconds = gameStart.clone().add(20, 'seconds');
      const last20Seconds = gameFinish.clone().subtract(20, 'seconds');

      let randomEvent;

      if (
        (now.isBefore(first20Seconds) || now.isAfter(last20Seconds)) &&
        gameTapEvents.some(event => event.type === GameTapEventType.BAN)
      ) {
        // Если сейчас в первые или последние 20 секунд и есть BAN, то пропускаем BAN
        let filteredEvents = gameTapEvents.filter(event => event.type !== GameTapEventType.BAN);
        randomEvent = getRandomGameTapEvent(filteredEvents);
      } else {
        randomEvent = getRandomGameTapEvent(gameTapEvents);
      }

      setTapEvent(randomEvent)
    }
  }

  useEffect(() => {
    handleTouchEvent()
  }, [touch])

  return (
    <>
      <GameTouchCircle touch={touch} />
      <GameTouchContent onRemove={onRemove} touch={touch} tapEvent={tapEvent} />
    </>
  );
};
