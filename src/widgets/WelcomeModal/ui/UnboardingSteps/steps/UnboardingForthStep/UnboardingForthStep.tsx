import clsx from 'clsx';
import cls from '../steps.module.scss';
import StepImage from '@/shared/assets/img/unboarding/step-4.png';
import { FontSize, FontWeight, Text } from '@/shared/ui/Text/Text';


interface UnboardingForthStepProps {
    className?: string;
    next?: (step?: number) => void
}

export const UnboardingForthStep: React.FC<UnboardingForthStepProps> = (props) => {
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
                Invite your friends and get additional streams and views together
            </Text>
        </div>
    );
}