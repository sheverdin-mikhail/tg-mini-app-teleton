import clsx from 'clsx';
import { useEffect, useState, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import cls from './Timer.module.scss';

export interface TimeProps {
  hours?: number;
  minutes: number;
  seconds: number;
}

interface TimerProps {
  className?: string;
  time: TimeProps;
  onFinish?: () => void;
  isPaused?: boolean;
}

export const Timer: React.FC<TimerProps> = (props) => {
  const { className, time, onFinish, isPaused = false } = props;
  const [hours, setHours] = useState(time.hours || 0);
  const [minutes, setMinutes] = useState(time.minutes);
  const [seconds, setSeconds] = useState(time.seconds);
  const [counted, setCounted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // ref для хранения id интервала

  const hourSpring = useSpring({ value: hours, from: { value: hours }, config: { tension: 120, friction: 14 } });
  const minuteSpring = useSpring({ value: minutes, from: { value: minutes }, config: { tension: 120, friction: 14 } });
  const secondSpring = useSpring({ value: seconds, from: { value: seconds }, config: { tension: 120, friction: 14 } });

  useEffect(() => {
    // Функция для обновления таймера
    const updateTimer = () => {
      if (seconds > 0) {
        setSeconds((prev) => prev - 1);
        setCounted(true);
      } else if (minutes > 0) {
        setMinutes((prev) => prev - 1);
        setSeconds(59);
        setCounted(true);
      } else if (hours > 0) {
        setHours((prev) => prev - 1);
        setMinutes(59);
        setSeconds(59);
        setCounted(true);
      } else {
        clearInterval(intervalRef.current as NodeJS.Timeout);
        if (counted) {
          onFinish?.();
        }
      }
    };

    // Очищаем предыдущий интервал, если он существует
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Устанавливаем новый интервал, если таймер не на паузе
    if (!isPaused) {
      intervalRef.current = setInterval(updateTimer, 1000);
    }

    return () => clearInterval(intervalRef.current as NodeJS.Timeout); // Очистка интервала при размонтировании компонента
  }, [hours, minutes, seconds, isPaused, onFinish, counted]);

  return (
    <div className={clsx(cls.timer, {}, [className])}>
      {hours > 0 && (
        <>
          <animated.div className={cls.time}>
            {hourSpring.value.to((val) => String(Math.floor(val)).padStart(2, '0'))}
          </animated.div>
          <span className={cls.time}>:</span>
        </>
      )}
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
