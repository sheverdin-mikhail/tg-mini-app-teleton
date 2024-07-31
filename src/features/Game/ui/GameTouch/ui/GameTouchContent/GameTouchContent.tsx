import clsx from 'clsx';
import cls from './GameTouchContent.module.scss';
import { GameTapEvent, GameTapEventType } from '../../../../model/types/game';
import React, { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Comment } from '@/shared/ui/Comment/Comment';
import { Emoji } from '@/shared/ui/Emoji/Emoji';
import { gameActions } from '@/features/Game/model/slice/gameSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text } from '@telegram-apps/telegram-ui';
import { ViewsIcon } from '@/shared/ui/ViewsIcon/ViewsIcon';


interface GameTouchContentProps {
    className?: string;
    tapEvent: GameTapEvent | null;
    touch: any;
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


export const GameTouchContent: React.FC<GameTouchContentProps> = React.memo(({ tapEvent, touch, onRemove }) => {
    const dispatch = useAppDispatch();
    const [content, setContent] = useState<JSX.Element | null>(null)
    const ref = useRef<any>(null);

    const [anime, api] = useSpring(() => ({
        
        from: { translateY: 0, opacity: 1 },
        to: { translateY: -200, opacity: 0 },
        config: { duration: 1500 },
        onRest: () => {
            onRemove?.(touch)
        }, // Remove element after animation completes
    }));


    useEffect(() => {
        if (!tapEvent) return;

        // Generate unique ID for each tap event
        setContent(getRandomContent(tapEvent.type));

        if (tapEvent.type === GameTapEventType.BAN) {
            dispatch(gameActions.getBun());
            if (!tapEvent) return;
        }

        api.start();

       
    }, [tapEvent, touch]);

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


    return (
        <animated.div
            ref={ref}
            style={{
                left: touch.clientX,
                top: touch.clientY,
                transform: anime.translateY.to(y => `translate(-50%, ${y}px)`),
                opacity: anime.opacity,
            }}
            className={clsx(cls.gameTouchContent)}
        >
            {content}
        </animated.div>
    );
});