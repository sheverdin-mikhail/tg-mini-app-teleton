import clsx from 'clsx';
import cls from './LiveLablel.module.scss';
import { Text } from '@telegram-apps/telegram-ui';

interface LiveLablelProps {
    className?: string;
}

export const LiveLablel: React.FC<LiveLablelProps> = (props) => {
    const { className } = props;

    return (
        <Text className={clsx(cls.liveLablel, {}, [className])} caps weight="1">live</Text>
    );
}