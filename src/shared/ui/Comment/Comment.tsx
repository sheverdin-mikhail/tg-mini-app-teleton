import clsx from 'clsx';
import cls from './Comment.module.scss';
import { Text } from '@telegram-apps/telegram-ui';

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