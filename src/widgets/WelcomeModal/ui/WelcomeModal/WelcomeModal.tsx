import clsx from 'clsx';
import {
  Button, Modal, Title,
} from '@telegram-apps/telegram-ui';
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';
import {
  useCallback, useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import cls from './WelcomeModal.module.scss';

interface WelcomeModalProps {
    className?: string;
    isOpen?: boolean;
    setIsOpen?: (isOpen: boolean) => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = (props) => {
  const { className, isOpen = false, setIsOpen } = props;
  const navigate = useNavigate();

  const onClickPlayHandler = useCallback(() => {
    setIsOpen?.(false);
    navigate('/');
  }, [setIsOpen, navigate]);

  const onClickFarm = useCallback(() => {

  }, []);

  const modalBody = useMemo(() => (
    <div className={cls.modalBody}>
      <div className={cls.buttons}>
        <Button className={cls.button} onClick={onClickPlayHandler}>
          Играть
        </Button>
        <Button className={cls.button} onClick={onClickFarm}>
          Как заработать
        </Button>
        <a href="https://t.me/StreamerTap_bot" target="_blank" className={cls.button} rel="noreferrer">
          <Button>
            Вступить в community продюсеров
          </Button>
        </a>
      </div>
    </div>
  ), [onClickFarm, onClickPlayHandler]);

  return (
    <Modal
      // style={{
      //   height: '100svh',
      // }}
      header={<ModalHeader />}
      className={clsx(cls.modal, [className])}
      open={isOpen}
    >
      <Title className={cls.title} weight="1">
        Welcome to TeleTON Tap!
      </Title>
      {modalBody}
    </Modal>
  );
};
