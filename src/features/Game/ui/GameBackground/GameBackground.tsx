import React, { useRef, useEffect } from 'react';
import cls from './GameBackground.module.scss';

interface GameBackgroundProps {
  level?: number;
}

export const GameBackground: React.FC<GameBackgroundProps> = (props) => {
  const { level } = props;
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = `/animations/level_${level ?? 1}.mp4`;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2.0;
      videoRef.current.play();
    }
  }, [videoSrc]);

  return (
    <video
      ref={videoRef}
      preload="auto"
      autoPlay
      loop
      muted
      playsInline
      className={cls.video}
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
};
