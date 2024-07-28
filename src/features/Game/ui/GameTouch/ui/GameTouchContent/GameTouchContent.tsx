import clsx from 'clsx';
import cls from './GameTouchContent.module.scss';
import { GameTapEvent, GameTapEventType } from '@/features/Game/model/types/game';
import { useEffect, useState } from 'react';
import { useSpring, animated, SpringValue } from '@react-spring/web';
import { Comment } from '@/shared/ui/Comment/Comment';
import { Emoji } from '@/shared/ui/Emoji/Emoji';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';


interface GameTouchContentProps {
    className?: string;
    tapEvent: GameTapEvent | null;
    touch: any;
}

interface AnimatedElement {
    id: number;
    x: number;
    y: number;
    type: GameTapEventType;
    content: JSX.Element;
    anime: {
        translateY: SpringValue<number>;
        opacity: SpringValue<number>;
    };
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

let idCounter = 0; // Unique identifier for each tap

export const GameTouchContent: React.FC<GameTouchContentProps> = ({ className, tapEvent, touch }) => {
    const dispatch = useAppDispatch();
    const [animatedElements, setAnimatedElements] = useState<AnimatedElement[]>([]);

    const id = idCounter++;
    const [anime, api] = useSpring(() => ({
        from: { translateY: 0, opacity: 1 },
        to: { translateY: -200, opacity: 0 },
        config: { duration: 500 },
        onRest: () => removeAnimatedElement(id), // Remove element after animation completes
    }));


    useEffect(() => {
        if (!tapEvent) return;

        // Generate unique ID for each tap event
        const randomContent = getRandomContent(tapEvent.type);

        // if (tapEvent.type === GameTapEventType.BAN) {
        //     dispatch(gameActions.getBun());
        // }

        setAnimatedElements((prev) => [
            ...prev,
            {
                id,
                x: touch.clientX,
                y: touch.clientY,
                type: tapEvent.type,
                content: randomContent,
                anime,
            },
        ]);

        api.start();

       
    }, [tapEvent, touch]);

    const getRandomContent = (type: GameTapEventType): JSX.Element => {
        switch (type) {
            case GameTapEventType.COMMENT:
                const randomComment = comments[Math.floor(Math.random() * comments.length)];
                return <Comment>{randomComment}</Comment>;
            case GameTapEventType.EMOJI:
                const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                return <Emoji>{randomEmoji}</Emoji>;
            case GameTapEventType.BAN:
                return <span style={{fontWeight: 'bold', fontSize: '32px'}} >Banned!</span>;
            default:
                return <span>Unknown event</span>;
        }
    };

    const removeAnimatedElement = (id: number) => {
        setAnimatedElements((prev) => prev.filter(element => element.id !== id));
    };

    return (
        <div className={clsx(cls.gameTouchContentContainer, className)}>
            {animatedElements.map(({ id, x, y, content, anime }) => (
                <animated.div
                    key={id}
                    style={{
                        left: x,
                        top: y,
                        transform: anime.translateY.to(y => `translate(-50%, ${y}px)`),
                        opacity: anime.opacity,
                    }}
                    className={clsx(cls.gameTouchContent)}
                >
                    {content}
                </animated.div>
            ))}
        </div>
    );
};