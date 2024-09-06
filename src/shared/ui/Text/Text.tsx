import clsx from 'clsx';
import cls from './Text.module.scss';
import { HTMLAttributes, ReactNode } from 'react';

interface TextProps extends HTMLAttributes<HTMLSpanElement> {
    className?: string;
    children: ReactNode;
    weight?: FontWeight;
    size?: FontSize;
    color?: TextColor;
    caps?: boolean;
}

export enum FontWeight {
    NORMAL = 'normal',
    MEDIUM = 'medium',
    BOLD = 'bold',
    BLACK = 'black',
}

export enum FontSize {
    XS = 'xs',
    SM = 'sm',
    BASE = 'base',
    LG = 'lg',
    XL = 'xl',
}

export enum TextColor {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    INVERTED = 'inverted',
}

export const Text: React.FC<TextProps> = (props) => {
    const { 
        className, 
        weight = FontWeight.NORMAL, 
        size = FontSize.BASE,
        children,
        color = TextColor.PRIMARY,
        caps = false,
    } = props;

    return (
        <span className={clsx(cls.text, {
            [cls.caps]: caps,
        }, [className, cls[weight], cls[size], cls[color]])}>
            {children}
        </span>
    );
}