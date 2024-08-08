import clsx from 'clsx';
import cls from './TapHelper.module.scss';
import TapIcon from '@/shared/assets/img/tap.svg';
import { useSpring, animated, useSpringRef } from '@react-spring/web';
import { useEffect, useRef, useState } from 'react';
import { NOT_FIRST_START_LOCALSTORAGE } from '@/shared/const/localStorage';
import { useSelector } from 'react-redux';
import { getGameIsStarted } from '../../model/selectors/gameSelector';

interface TapHelperProps {
    className?: string;
}

export const TapHelper: React.FC<TapHelperProps> = (props) => {
    const { className } = props;
    const [tapCounter, setTapCounter] = useState(0)
    const streamIsStarted = useSelector(getGameIsStarted)
    const springRef = useSpringRef()
    const [isHidden, setIsHidden] = useState(true)
    const timeoutRef = useRef<any>(null)

    const [anime, api] = useSpring(() => ({
        ref: springRef,
        from: {
            opacity: 0,
            transform: 'translate(-50%, -50%) rotateX(0) scale(2)',
        },
        to: [
            {opacity: 1, transform: 'translate(-50%, -50%) rotateX(0) scale(1)',},
            {opacity: 1, transform: 'translate(-50%, -50%) rotateX(30deg) scale(1)',},
            {opacity: 1, transform: 'translate(-50%, -50%) rotateX(0) scale(1)',},
            {opacity: 1, transform: 'translate(-50%, -50%) rotateX(30deg) scale(1)',},
            {opacity: 1, transform: 'translate(-50%, -50%) rotateX(0) scale(1)',},
        ],
        loop: true,
        config: {
            duration: 500,
            easing: (x: number) => {
                return x < 0.5
                    ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
                    : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
            },
        },
    }))

    useEffect(() => {
        const isNotFirstStart = localStorage.getItem(NOT_FIRST_START_LOCALSTORAGE)
        if (!isNotFirstStart && streamIsStarted) {
            setIsHidden(false)
            timeoutRef.current = setTimeout(() => api.start(), 1000)
        } 

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [streamIsStarted])

    useEffect(() => {
        if (tapCounter >= 5) {
            api.stop()
            setIsHidden(true)
            localStorage.setItem(NOT_FIRST_START_LOCALSTORAGE, 'true')
        }
    }, [tapCounter])

    const onClickHandler = () => {
        if(streamIsStarted) {
            setTapCounter(prev => prev + 1)
        }
    }

    if (isHidden || !streamIsStarted) {
        return null
    }


    return (
        <div 
            className={clsx(cls.tapHelper, {}, [className])}
            onClick={onClickHandler}
        >
            <animated.div
                style={{
                    opacity: anime.opacity,
                    transform: anime.transform,
                }}
                className={cls.iconContainer}
            >
                <TapIcon className={cls.icon} />
            </animated.div>
        </div>
    );
}