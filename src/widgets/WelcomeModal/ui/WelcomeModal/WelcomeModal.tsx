import clsx from 'clsx';
import { Modal, Title } from '@telegram-apps/telegram-ui';
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';
import cls from './WelcomeModal.module.scss';

interface WelcomeModalProps {
    className?: string;
    isOpen?: boolean;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = (props) => {
  const { className, isOpen = false } = props;

  return (
    <Modal
      header={<ModalHeader />}
      className={clsx(cls.modal, [className])}
      open={isOpen}
    >
      <Title className={cls.title} weight="1">
        Welcome to Teleton Tap!
      </Title>
    </Modal>
  );
};
