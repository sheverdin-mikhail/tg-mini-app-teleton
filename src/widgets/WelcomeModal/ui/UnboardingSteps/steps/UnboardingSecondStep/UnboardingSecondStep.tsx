import clsx from 'clsx';
import cls from '../steps.module.scss';
import StepImage from '@/shared/assets/img/unboarding/step-2.png';
import { FontSize, FontWeight, Text } from '@/shared/ui/Text/Text';


interface UnboardingSecondStepProps {
    className?: string;
    next?: (step?: number) => void

}

export const UnboardingSecondStep: React.FC<UnboardingSecondStepProps> = (props) => {
    const { className } = props;

    return (
        <div className={clsx(cls.step, {}, [className])}>
            <div className={cls.stepContainer}>
                <img src={StepImage} className={cls.img} />
            </div>
            <Text className={cls.text} size={FontSize.XL} weight={FontWeight.MEDIUM}>
                Boost
            </Text>
            <Text className={cls.text} size={FontSize.LG}>
                Become popular. Rise from the beginner to a famous streamer
            </Text>
        </div>
    );
}