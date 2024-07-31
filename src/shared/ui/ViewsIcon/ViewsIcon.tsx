import cls from './ViewsIcon.module.scss'

interface ViewsIconProps {
    className?: string;
    width?: number;
    height?: number;
}
import ViewsIconImgage from '../../assets/icons/views-icon.svg';
import clsx from 'clsx';

export const ViewsIcon: React.FC<ViewsIconProps> = (props) => {
    const { className, width = 20, height = 20 } = props;

    return (
        <ViewsIconImgage className={clsx(cls.icon, className)} width={width} height={height}/>
    );
}