import clsx from 'clsx';
import cls from './PointsBadge.module.scss';
import { ViewsIcon } from '../ViewsIcon/ViewsIcon';
import { ReactNode } from 'react';

interface PointsBadgeProps {
    className?: string;
    size?: PointsBadgeSize;
    children: ReactNode;
    disabled?: boolean;
}


export enum PointsBadgeSize {
    LARGE = 'lg',
    SMALL = 'sm'
}

export const PointsBadge: React.FC<PointsBadgeProps> = (props) => {
    const { className, size = PointsBadgeSize.LARGE, children, disabled = false } = props;

    return (
        <div className={clsx(cls.pointsBadge, {
            [cls.disabled]: disabled
        }, [className, cls[size]])}>
            <ViewsIcon className={cls.icon} />
            {children}
        </div>
    );
}