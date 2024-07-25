import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import cls from './Timer.module.scss';

interface TimeProps {
    minutes: number;
    seconds: number;
}

interface TimerProps {
    className?: string;
    time: TimeProps;
    onFinish?: () => void;
}

export const Timer: React.FC<TimerProps> = (props) => {
  const { className, time, onFinish } = props;
  const [minutes, setMinutes] = useState(time.minutes);
  const [seconds, setSeconds] = useState(time.seconds);
  const [counted, setCounted] = useState(false);

  const minuteSpring = useSpring({ value: minutes, from: { value: minutes }, config: { tension: 120, friction: 14 } });
  const secondSpring = useSpring({ value: seconds, from: { value: seconds }, config: { tension: 120, friction: 14 } });

  useEffect(() => {
    // Sync component state with props
    setMinutes(time.minutes);
    setSeconds(time.seconds);
  }, [time]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
        setCounted(true);
      } else if (minutes > 0 && seconds === 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
        setCounted(true);
      } else {
        clearInterval(interval);
        if (counted) {
          onFinish?.();
        }
      }
    }, 1000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [minutes, seconds, onFinish, counted]);

  return (
    <div className={clsx(cls.timer, {}, [className])}>
      <animated.div className={cls.time}>
        {minuteSpring.value.to((val) => String(Math.floor(val)).padStart(2, '0'))}
      </animated.div>
      <span className={cls.time}>:</span>
      <animated.div className={cls.time}>
        {secondSpring.value.to((val) => String(Math.floor(val)).padStart(2, '0'))}
      </animated.div>
    </div>
  );
};
