import clsx from 'clsx';
import cls from '../steps.module.scss';
import StepImage from '@/shared/assets/img/unboarding/step-2.png';
import { Text } from '@telegram-apps/telegram-ui';


interface UnboardingSecondStepProps {
    className?: string;
    next?: (step?: number) => void

}

export const UnboardingSecondStep: React.FC<UnboardingSecondStepProps> = (props) => {
    const { className } = props;

    return (
        <div className={clsx(cls.step, {}, [className])}>
            <img src={StepImage} className={cls.img} />
            <Text className={cls.text}>
                Become popular. Rise from the beginner to a famous streamer
            </Text>
        </div>
    );
}