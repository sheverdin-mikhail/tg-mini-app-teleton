import { useSpring, animated } from '@react-spring/web';
import { useEffect } from 'react';
import cls from './GameTouch.module.scss';

interface GameTouchProps {
  className?: string;
  touch: any;
}

export const GameTouch: React.FC<GameTouchProps> = (props) => {
  const { touch } = props;

  const [anime, api] = useSpring(() => ({
    width: 0,
    height: 0,
    opacity: 1,
    config: { duration: 500 },
  }));

  useEffect(() => {
    api.start({
      width: 50,
      height: 50,
      opacity: 0,
      reset: true,
    });
  }, [touch, api]);

  return (
    <animated.div
      className={cls.touch}
      style={{
        left: touch.clientX,
        top: touch.clientY,
        width: anime.width,
        height: anime.height,
        opacity: anime.opacity,
      }}
    />
  );
};
