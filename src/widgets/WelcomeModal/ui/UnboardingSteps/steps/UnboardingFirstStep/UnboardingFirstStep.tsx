import clsx from 'clsx';
import cls from '../steps.module.scss';
import StepImage from '@/shared/assets/img/unboarding/step-1.png';
import { Text } from '@telegram-apps/telegram-ui';

interface UnboardingFirstStepProps {
    className?: string;
    next?: (step?: number) => void
}

export const UnboardingFirstStep: React.FC<UnboardingFirstStepProps> = (props) => {
    const { className } = props;

    return (
        <div className={clsx(cls.step, {}, [className])}>
            <img src={StepImage} className={cls.img} />
            <Text className={cls.text}>
                Tap on the streamer and get views. Use boosters and bonuses
            </Text>
        </div>
    );
}