import clsx from 'clsx';
import cls from '../steps.module.scss';
import StepImage from '@/shared/assets/img/unboarding/step.jpg';
import { Text } from '@telegram-apps/telegram-ui';

interface UnboardingThirdStepProps {
    className?: string;
    next?: (step?: number) => void

}

export const UnboardingThirdStep: React.FC<UnboardingThirdStepProps> = (props) => {
    const { className } = props;

    return (
        <div className={clsx(cls.step, {}, [className])}>
            <img src={StepImage} className={cls.img} />
            <Text className={cls.text}>
                Improve your skills and get more views
            </Text>
        </div>
    );
}