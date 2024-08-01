import clsx from 'clsx';
import cls from '../steps.module.scss';
import StepImage from '@/shared/assets/img/unboarding/step-4.png';
import { Text } from '@telegram-apps/telegram-ui';


interface UnboardingForthStepProps {
    className?: string;
    next?: (step?: number) => void
}

export const UnboardingForthStep: React.FC<UnboardingForthStepProps> = (props) => {
    const { className } = props;

    return (
        <div className={clsx(cls.step, {}, [className])}>
            <img src={StepImage} className={cls.img} />
            <Text className={cls.text}>
                Invite your friends and get additional streams and views together
            </Text>
        </div>
    );
}