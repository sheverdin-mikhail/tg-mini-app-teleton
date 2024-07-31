import clsx from 'clsx';
import cls from './AwesomeIcon.module.scss';

interface AwesomeIconProps {
    className?: string;
    logo?: string;
    color?: string;
}

export const AwesomeIcon: React.FC<AwesomeIconProps> = (props) => {
    const { className, logo, color = "var(--tg-theme-text-color)" } = props;

    return (
        <i 
            className={clsx([logo, className], cls.awesomeIcon)}
            style={{
                color: color
            }}
        ></i>
    );
}