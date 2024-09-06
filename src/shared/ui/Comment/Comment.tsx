import clsx from 'clsx';
import cls from './Comment.module.scss';
import { FontSize, FontWeight, Text, TextColor } from '../Text/Text';

interface CommentProps {
    className?: string;
    children: string;
}

export const Comment: React.FC<CommentProps> = (props) => {
    const { className, children } = props;

    return (
        <div className={clsx(cls.comment, {}, [className])}>
            <Text weight={FontWeight.BOLD} size={FontSize.LG} color={TextColor.INVERTED}>{children}</Text>
        </div>
    );
}