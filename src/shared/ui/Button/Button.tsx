import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';
import cls from './Button.module.scss';
import { FontWeight, Text, TextColor } from '@/shared/ui/Text/Text';
import { Spinner } from '@telegram-apps/telegram-ui';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string;
    theme?: ButtonTheme;
    size?: ButtonSize;
    loading?: boolean;
}
export enum ButtonTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary'
}

export enum ButtonSize {
    LARGE = 'lg',
    SMALL = 'sm'
}

export const Button: React.FC<ButtonProps> = (props) => {
    const { 
        className, 
        children, 
        theme = ButtonTheme.PRIMARY, 
        size = ButtonSize.LARGE, 
        disabled = false,
        loading = false,
        ...otherProps 
    } = props;



    return (
        <button 
            className={clsx(cls.button, {
                [cls.disabled]: disabled
            }, [className, cls[theme], cls[size]])}
            disabled={disabled}
            {...otherProps}
        >
            {
                loading
                ? <Spinner size='s' />
                : <Text weight={FontWeight.BOLD} color={theme === ButtonTheme.PRIMARY ? TextColor.INVERTED : TextColor.PRIMARY} className={cls.text}>
                    {children}
                </Text>
            }
        </button>
    );
}