import { useMemo } from 'react';
import cls from './GameBackground.module.scss';

interface GameBackgroundProps {
    className?: string;
    level?: number;
}
export const GameBackground: React.FC<GameBackgroundProps> = (props) => {
  const { level } = props;

  const videoSrc = useMemo(() => `/animations/level_${level ?? 1}.mp4`, [level]);

  return (
    <video preload="auto" autoPlay loop muted playsInline className={cls.video}>
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
};
