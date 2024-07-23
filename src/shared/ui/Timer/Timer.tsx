import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Text } from '@telegram-apps/telegram-ui';
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

  const minuteSpring = useSpring({ value: minutes, from: { value: minutes }, config: { tension: 120, friction: 14 } });
  const secondSpring = useSpring({ value: seconds, from: { value: seconds }, config: { tension: 120, friction: 14 } });

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0 && seconds === 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        clearInterval(interval);
        onFinish?.();
      }
    }, 1000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [minutes, seconds, onFinish]);

  return (
    <div className={clsx(cls.timer, {}, [className])}>
      <animated.div className={cls.time}>
        {minuteSpring.value.to((val) => String(Math.floor(val)).padStart(2, '0'))}
      </animated.div>
      <Text className={cls.time} weight="1">:</Text>
      <animated.div className={cls.time}>
        {secondSpring.value.to((val) => String(Math.floor(val)).padStart(2, '0'))}
      </animated.div>
    </div>
  );
};
