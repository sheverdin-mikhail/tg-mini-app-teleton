import clsx from 'clsx';
import cls from './QrCodeModal.module.scss';
import { Modal } from '@/shared/ui/Modal/Modal';
import { useEffect, useState } from 'react';
import { useTelegram } from '@/shared/lib/hooks/useTelegram/useTelegram';
import QrCode from '@/shared/assets/img/qr-code.svg';
import { Text, Title } from '@telegram-apps/telegram-ui';

interface QrCodeModalProps {
    className?: string;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = (props) => {
    const { className } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { platform } = useTelegram()

    useEffect(() => {
        if (platform === 'tdesktop' || platform === 'macos') {
            setIsOpen(true)
        }
          
    }, [platform])

    return (
        <Modal 
            className={clsx(cls.qrCodeModal, {}, [className])}
            isOpen={isOpen}
        >
            <Title className={cls.title}>Play on your mobile</Title>
            <QrCode className={cls.image} />
            <Text className={cls.text}>@TeletonClickerBot</Text>
        </Modal>
    );
}