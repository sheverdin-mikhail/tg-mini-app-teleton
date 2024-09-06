import clsx from 'clsx';
import cls from './LocationPage.module.scss';
import { Location } from '@/features/Location';
import { useTelegram } from '@/shared/lib/hooks/useTelegram/useTelegram';
import { useEffect } from 'react';


interface LocationPageProps {
    className?: string;
}

export const LocationPage: React.FC<LocationPageProps> = (props) => {
    const { className } = props;
    const {initBackButton, removeBackButton} = useTelegram()

    useEffect(() => {
        initBackButton()

        return () => removeBackButton()
    }, [])

    return (
        <div className={clsx(cls.locationPage, {}, [className])}>
            <Location />
        </div>
    );
}