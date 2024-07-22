import { GameLevel } from '../GameLevel/GameLevel';

interface GameProps {
  className?: string;
}

export const Game: React.FC<GameProps> = (props) => (
  <GameLevel />
);
