import { Modal } from '@telegram-apps/telegram-ui';
import clsx from 'clsx';
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';
import cls from './UpLevelConditionsModal.module.scss';
import { UpLevelConditionsList } from '../UpLevelConditionsList/UpLevelConditionsList';

interface UpLevelConditionsModalProps {
  className?: string;
  trigger: any;
  // isOpen?: boolean;
  // setIsOpen: () => void;
}

export const UpLevelConditionsModal: React.FC<UpLevelConditionsModalProps> = (props) => {
  const { className, trigger } = props;

  return (
    <Modal
      className={clsx(cls.upLevelConditionsModal, {}, [className])}
      // open={isOpen}
      header={<ModalHeader />}
      trigger={trigger}
    >
      <UpLevelConditionsList />
    </Modal>
  );
};
