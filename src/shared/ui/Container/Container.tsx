import clsx from 'clsx';
import cls from './Container.module.scss';
import { ReactNode } from 'react';

interface ContainerProps {
    className?: string;
    children: ReactNode;
}

export const Container: React.FC<ContainerProps> = (props) => {
    const { className, children } = props;

    return (
        <div className={clsx(cls.container, {}, [className])}>
            {children}
        </div>
    );
}