import {
  useCallback, useEffect, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { getUserCurrentLevel, getUserTotalPoins } from '@/entities/User';
import { Modal } from '@/shared/ui/Modal/Modal';
import { getGameIsStarted, useLevelUp } from '@/features/Game';
import { getLevels, LevelImages } from '@/entities/Level';
import cls from './LevelUpModal.module.scss';
import { FontSize, FontWeight, Text, TextColor } from '@/shared/ui/Text/Text';
import { Button } from '@/shared/ui/Button/Button';

interface LevelUpModalProps {
    className?: string;
    onClose?: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = (props) => {
  const {
    onClose,
  } = props;
  const [levelUpMutation, {isLoading}] = useLevelUp();
  const [isOpen, setIsOpen] = useState(false);
  const totalPoints = useSelector(getUserTotalPoins);
  const gameIsStart = useSelector(getGameIsStarted);
  const userLevel = useSelector(getUserCurrentLevel);
  const levelsList = useSelector(getLevels);
  const nextLevel = levelsList.find((level) => level.level === Number(userLevel?.level) + 1);

  useEffect(() => {
    if (nextLevel && userLevel?.pointToNextLevel && (totalPoints >= userLevel?.pointToNextLevel)) {
      if (!gameIsStart) {
        setIsOpen(true);
      }
    }
  }, [gameIsStart, userLevel, totalPoints, levelsList]);

  const onCloseHandler = useCallback(() => {
    onClose?.();
    levelUpMutation();
    setIsOpen(false);
  }, [onClose, levelUpMutation]);

  return (
    <Modal isOpen={isOpen} onClose={onCloseHandler} className={cls.levelUpModal}>
      <Text className={cls.title} size={FontSize.LG} weight={FontWeight.MEDIUM} >
        Your lvl is UP!
      </Text>

      <div className={cls.imageContainer}>
        <img src={LevelImages[nextLevel?.level ?? 1]} alt="level-image"  className={cls.image}/>
      </div>

      <div className={cls.block}>
        <Text size={FontSize.LG} weight={FontWeight.BOLD}>{nextLevel?.name}</Text>
        <Text size={FontSize.SM} weight={FontWeight.MEDIUM} color={TextColor.SECONDARY}>Current location</Text>
        <Text size={FontSize.SM} weight={FontWeight.MEDIUM} color={TextColor.SECONDARY}>{nextLevel?.description}</Text>
      </div>

      <Button disabled={isLoading} loading={isLoading} className={cls.button} onClick={onCloseHandler}>Cool!</Button>
    </Modal>
  );
};
