import React from 'react';
import { GameTouchCircle } from '../GameTouchCircle/GameTouchCircle';

interface GameTouchProps {
  className?: string;
  touch: any;
  onRemove?: (touch: any) => void
}

export const GameTouch: React.FC<GameTouchProps> = React.memo(({touch}) => {
  


  return (
    <>
      <GameTouchCircle touch={touch} />
    </>
  );
});
