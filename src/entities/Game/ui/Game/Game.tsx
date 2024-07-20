import clsx from 'clsx';
import cls from './Game.module.scss';

interface GameProps {
    className?: string;
}

export const Game: React.FC<GameProps> = (props) => {
  const { className } = props;

  return (
    <div className={clsx(cls.game, {}, [className])}>
      Game
    </div>
  );
};
