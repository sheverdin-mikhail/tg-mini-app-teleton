import clsx from 'clsx';
import { useTelegram } from '@/shared/lib/hooks/useTelegram/useTelegram';
import { useEffect } from 'react';
import { PageContentHeader } from '@/widgets/PageContentHeader';
import { DailyRewards } from '@/features/DailyRewards';
import { Container } from '@/shared/ui/Container/Container';
import DailyRewardPageImage from '@/shared/assets/img/daily-reward.png'; 
import cls from './DailyRewardDetailPage.module.scss';


interface DailyRewardDetailPageProps {
    className?: string;
}

export const DailyRewardDetailPage: React.FC<DailyRewardDetailPageProps> = (props) => {
    const { className } = props;

    const { initBackButton, removeBackButton } = useTelegram()

    useEffect(() => {
        initBackButton()

        return () => removeBackButton()
    }, [])

    return (
        <div className={clsx(cls.DailyRewardDetailPage, {}, [className])}>
            <Container className={cls.content}>
                <PageContentHeader 
                    title='Take your daily reward' 
                    description='Get your reward for logging into the game every day. The "Take" button must be pressed every day, otherwise the counter will return to the beginning'
                    img={DailyRewardPageImage}
                />
                <DailyRewards />
            </Container>
        </div>
    );
}