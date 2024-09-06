import clsx from 'clsx';
import cls from '../steps.module.scss';
import StepImage from '@/shared/assets/img/unboarding/step-3.png';
import { FontSize, FontWeight, Text } from '@/shared/ui/Text/Text';

interface UnboardingThirdStepProps {
    className?: string;
    next?: (step?: number) => void

}

export const UnboardingThirdStep: React.FC<UnboardingThirdStepProps> = (props) => {
    const { className } = props;

    return (
        <div className={clsx(cls.step, {}, [className])}>
            <div className={cls.stepContainer}>
                <img src={StepImage} className={cls.img} />
            </div>
            <Text className={cls.text} size={FontSize.XL} weight={FontWeight.MEDIUM}>
                Level
            </Text>
            <Text className={cls.text} size={FontSize.LG}>
                Improve your skills and get more views
            </Text>
        </div>
    );
}