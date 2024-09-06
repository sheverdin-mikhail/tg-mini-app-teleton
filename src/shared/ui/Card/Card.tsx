import clsx from 'clsx';
import cls from './Card.module.scss';
import { HTMLAttributes, ReactNode } from 'react';
import { Skeleton } from '../Skeleton/Skeleton';

interface CardProps extends HTMLAttributes<HTMLDivElement>{
    className?: string;
    children: ReactNode;
    loading?: boolean;
}

export const Card: React.FC<CardProps> = (props) => {
    const { className, children, loading = false, ...otherProps } = props;

    if(loading) { 
        return <Skeleton width='100%' height='64px' />
    }

    return (
        <div className={clsx(cls.card, {}, [className])} {...otherProps}>
            {children}
        </div>
    );
}