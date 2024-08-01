import clsx from 'clsx';
import cls from './GameTouchContent.module.scss';
import { GameTapEventType } from '../../model/types/game';
import React, { useMemo } from 'react';
import { animated } from '@react-spring/web';
import { Comment } from '@/shared/ui/Comment/Comment';
import { Emoji } from '@/shared/ui/Emoji/Emoji';
import { Text } from '@telegram-apps/telegram-ui';
import { ViewsIcon } from '@/shared/ui/ViewsIcon/ViewsIcon';
import { getGameFinishAt, getGameStartedAt, getGameTapEvents } from '../../model/selectors/gameSelector';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { getRandomGameTapEvent } from '../../model/services/getRandomGameTapEvent';


interface GameTouchContentProps {
    className?: string;
    touch: any;
    anime: any;
    onRemove?: (touch: any) => void;
}



const comments = [
    'Hi there!',
    'Nice',
    'I like your streams!',
    'Hahaha',
    'LOL',
    'I love that',
    'Cool',
    'WOW',
    'Smooth…',
    'Where you from?',
    'Yep',
    'ok',
]

const emojis = [
    '🤣',
    '😱',
    '🥸',
    '🤮',
    '💩',
    '👍',
    '🤡',
    '❤️',
    '😍',
    '🙈',
    '🌚',
    '🫠',
]


export const GameTouchContent: React.FC<GameTouchContentProps> = React.memo(({ touch, anime }) => {

    const gameTapEvents = useSelector(getGameTapEvents)
    const gameStartedAt = useSelector(getGameStartedAt)
    const gameFinishAt = useSelector(getGameFinishAt)

    const getRandomContent = (type: GameTapEventType): JSX.Element | null => {
        switch (type) {
            case GameTapEventType.VIEW:
                return <Text className={cls.row}> <span className={cls.points}>+1</span> <ViewsIcon /> </Text>
            case GameTapEventType.COMMENT:
                const randomComment = comments[Math.floor(Math.random() * comments.length)];
                return <Comment>{randomComment}</Comment>;
            case GameTapEventType.EMOJI:
                const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                return <Emoji>{randomEmoji}</Emoji>;
            case GameTapEventType.BAN:
                return null;
            default:
                return <span>Unknown event</span>;
        }
    };
    

    const createTapEventHandler = () => {
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
    
          return getRandomContent(randomEvent.type);
        }
      }

    const tapEvent = useMemo(() => {
        return createTapEventHandler()
    }, [])



    return (
        <animated.div
            style={{
                left: touch.clientX,
                top: touch.clientY,
                transform: anime.translateY.to((y: any) => `translate(-50%, ${y}px)`),
                opacity: anime.opacity,
            }}
            className={clsx(cls.gameTouchContent)}
        >
            {tapEvent && tapEvent}
        </animated.div>
    );
});
