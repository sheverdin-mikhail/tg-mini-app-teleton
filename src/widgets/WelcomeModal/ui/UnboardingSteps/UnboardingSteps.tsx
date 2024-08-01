import clsx from 'clsx';
import cls from './UnboardingSteps.module.scss';
import { useMemo, useState } from 'react';
import { UnboardingFirstStep } from './steps/UnboardingFirstStep/UnboardingFirstStep';
import { UnboardingSecondStep } from './steps/UnboardingSecondStep/UnboardingSecondStep';
import { UnboardingThirdStep } from './steps/UnboardingThirdStep/UnboardingThirdStep';
import { UnboardingForthStep } from './steps/UnboardingForthStep/UnboardingForthStep';
import { Button, CompactPagination } from '@telegram-apps/telegram-ui';
import { CompactPaginationItem } from '@telegram-apps/telegram-ui/dist/components/Navigation/CompactPagination/components/CompactPaginationItem/CompactPaginationItem';

interface UnboardingStepsProps {
    className?: string;
    onClose?: () => void;
}

const STEPS = 4;

export const UnboardingSteps: React.FC<UnboardingStepsProps> = (props) => {
    const { className, onClose } = props;

    const [step, setStep] = useState(1);

    const unboardingStepContent = useMemo(() => {
        switch (step) {
            case 1: {
                return <UnboardingFirstStep />
            }
            case 2: {
                return <UnboardingSecondStep />
            }
            case 3: {
                return <UnboardingThirdStep />
            }
            case 4: {
                return <UnboardingForthStep />
            }
        }
    }, [step])

    const nextStepHandler = () => {
        if (step >= STEPS) {
            onClose?.()
            return
        }
        setStep(step + 1)
    }


    return (
        <div className={clsx(cls.unboardingSteps, {}, [className])}>
            {
                unboardingStepContent
            }
            <CompactPagination className={cls.pagination}>
                {
                    [...Array(STEPS).keys()].map((item) => (
                        <CompactPaginationItem 
                            key={item} 
                            selected={item === step - 1}
                            onClick={() => setStep(item + 1)}
                        >
                            {item}
                        </CompactPaginationItem>
                    ))
                }
            </CompactPagination>
            <Button onClick={() => nextStepHandler()} className={cls.button}>
                {
                    step === STEPS 
                    ? 'Start streaming'
                    : 'Next'
                }
            </Button>
        </div>
    );
}