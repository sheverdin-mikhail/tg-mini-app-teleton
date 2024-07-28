import clsx from 'clsx';
import cls from './Emoji.module.scss';
import { Text } from '@telegram-apps/telegram-ui';

interface EmojiProps {
    className?: string;
    children: any;
}

export const Emoji: React.FC<EmojiProps> = (props) => {
    const { className, children } = props;

    return (
        <Text weight='1' className={clsx(cls.emoji, {}, [className])}>
            {children}
        </Text>
    );
}