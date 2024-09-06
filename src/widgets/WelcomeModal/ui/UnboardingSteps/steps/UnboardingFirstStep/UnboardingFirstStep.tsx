import clsx from 'clsx';
import cls from '../steps.module.scss';
import StepImage from '@/shared/assets/img/unboarding/step-1.png';
import { FontSize, FontWeight, Text } from '@/shared/ui/Text/Text';

interface UnboardingFirstStepProps {
    className?: string;
    next?: (step?: number) => void
}

export const UnboardingFirstStep: React.FC<UnboardingFirstStepProps> = (props) => {
    const { className } = props;

    return (
        <div className={clsx(cls.step, {}, [className])}>
            <div className={cls.stepContainer}>
                <img src={StepImage} className={cls.img} />
            </div>
            <Text className={cls.text} size={FontSize.XL} weight={FontWeight.MEDIUM}>
                Streaming
            </Text>
            <Text className={cls.text} size={FontSize.LG}>
                Start your stream, tap on the streamer and get views. Use boosters and bonuses
            </Text>
        </div>
    );
}