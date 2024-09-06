import {
  ReactNode, useCallback, useEffect, useRef,
} from 'react';
import { Portal } from '@/shared/ui/Portal/Portal';
import clsx from 'clsx';
import { AwesomeIcon } from '../AwesomeIcon/AwesomeIcon';
import cls from './Modal.module.scss';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  withClose?: boolean;
  onClose?: () => void;
}

export const Modal: React.FC<ModalProps> = (props) => {
  const {
    className,
    children,
    isOpen = false,
    withClose = true,
    onClose,
  } = props;

  const closeBtnRef = useRef(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const modalRef = useRef(document.getElementById('app-modals'));

  const closeHandler = useCallback(() => {
    onClose?.()
  }, [onClose]);

  const overlayClickHandler = useCallback((e: any) => {
    if (e.target === closeBtnRef.current) {
      closeHandler();
    }
  }, [closeHandler]);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeHandler();
    }
  }, [closeHandler]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  const mods = {
    [cls.opened]: isOpen,
  };

  return (
    <Portal element={modalRef.current!}>
      <div className={clsx(cls.modal, mods)}>
        <div className={cls.overlay}>
          <div className={clsx(cls.content, {}, [className])}>
            {
              withClose && (
                <div className={cls.btn} onClick={overlayClickHandler} ref={closeBtnRef}>
                  <AwesomeIcon className={cls.icon} icon='fa-solid fa-xmark' />
                </div>
              )
            }
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
