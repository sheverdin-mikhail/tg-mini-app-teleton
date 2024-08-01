import { Modal } from '@telegram-apps/telegram-ui';
import clsx from 'clsx';
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';
import cls from './UpLevelConditionsModal.module.scss';
import { UpLevelConditionsList } from '../UpLevelConditionsList/UpLevelConditionsList';
import { ModalClose } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalClose/ModalClose';
import { AwesomeIcon } from '@/shared/ui/AwesomeIcon/AwesomeIcon';

interface UpLevelConditionsModalProps {
  className?: string;
  trigger: any;
  isOpen?: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const UpLevelConditionsModal: React.FC<UpLevelConditionsModalProps> = (props) => {
  const { className, trigger, setIsOpen, isOpen = false } = props;

  const onCloseHandler = () => {
    setIsOpen(false);
  }

  return (
    <Modal
      dismissible={false}
      open={isOpen}
      className={clsx(cls.upLevelConditionsModal, {}, [className])}
      header={<ModalHeader 
        after={<div onClick={onCloseHandler}>
          <ModalClose><AwesomeIcon icon='fa-solid fa-xmark' /></ModalClose>
        </div>}
      />}
      
      trigger={trigger}
    >
      <UpLevelConditionsList />
    </Modal>
  );
};
