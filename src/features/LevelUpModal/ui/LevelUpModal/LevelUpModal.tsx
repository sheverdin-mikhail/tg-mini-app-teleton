import {
  useCallback, useEffect, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { getUserCurrentLevel, getUserTotalPoins } from 'entities/User';
import { Modal } from 'shared/ui/Modal/Modal';
import { Button, Title } from '@telegram-apps/telegram-ui';
import { getGameIsStarted, useLevelUp } from 'features/Game';
import cls from './LevelUpModal.module.scss';

interface LevelUpModalProps {
    className?: string;
    onClose?: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = (props) => {
  const {
    onClose,
  } = props;
  const [levelUpMutation] = useLevelUp();
  const [isOpen, setIsOpen] = useState(false);
  const totalPoints = useSelector(getUserTotalPoins);
  const gameIsStart = useSelector(getGameIsStarted);
  const userLevel = useSelector(getUserCurrentLevel);

  useEffect(() => {
    if (userLevel?.pointToNextLevel && (totalPoints >= userLevel?.pointToNextLevel)) {
      if (!gameIsStart) {
        setIsOpen(true);
      }
    }
  }, [gameIsStart, userLevel, totalPoints]);

  const onCloseHandler = useCallback(() => {
    onClose?.();
    levelUpMutation();
    setIsOpen(false);
  }, [onClose, levelUpMutation]);

  return (
    <Modal isOpen={isOpen} onClose={onCloseHandler} className={cls.levelUpModal}>
      <Title caps className={cls.title} weight="1">
        Your lvl is UP!
      </Title>
      <div className={cls.buttons}>
        <Button className={cls.button} onClick={onCloseHandler}>Cool!</Button>
      </div>
    </Modal>
  );
};
