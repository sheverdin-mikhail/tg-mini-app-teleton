import clsx from 'clsx';
import { Text } from '@telegram-apps/telegram-ui';
import cls from './Comment.module.scss';

interface CommentProps {
    className?: string;
    children: string;
}

export const Comment: React.FC<CommentProps> = (props) => {
    const { className, children } = props;

    return (
        <div className={clsx(cls.comment, {}, [className])}>
            <Text weight='1'>{children}</Text>
        </div>
    );
}