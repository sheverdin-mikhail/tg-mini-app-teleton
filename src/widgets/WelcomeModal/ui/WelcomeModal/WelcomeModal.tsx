import clsx from 'clsx';
import cls from './WelcomeModal.module.scss';
import { Modal } from '@/shared/ui/Modal/Modal';
import { UnboardingSteps } from '../UnboardingSteps/UnboardingSteps';

interface WelcomeModalProps {
    className?: string;
    isOpen?: boolean;
    setIsOpen?: (isOpen: boolean) => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = (props) => {
  const { className, isOpen = false, setIsOpen } = props;
  // const navigate = useNavigate();

  const onCloseHandler = () => {
    setIsOpen?.(false)
  }


  return (
    <Modal
      isOpen={isOpen}
      className={clsx(cls.modal, [className])}
      onClose={onCloseHandler}
    >
      <UnboardingSteps onClose={onCloseHandler}/>
    </Modal>
  );
};
