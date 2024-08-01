import clsx from 'clsx';
import cls from './AwesomeIcon.module.scss';

interface AwesomeIconProps {
    className?: string;
    icon?: string;
    color?: string;
}

export const AwesomeIcon: React.FC<AwesomeIconProps> = (props) => {
    const { className, icon } = props;

    return (
        <i 
            className={clsx([icon, className], cls.awesomeIcon)}
        ></i>
    );
}