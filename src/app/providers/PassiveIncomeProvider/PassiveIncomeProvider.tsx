import { earnIncomePerSeconds, getUserTotalPoins, userActions } from "@/entities/User";
import { useSavePoints } from "@/features/Game";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";

interface PassiveIncomeProviderProps {
    children: ReactElement
}

export const PassiveIncomeProvider: React.FC<PassiveIncomeProviderProps> = ({children}) => {

    const totalPoints = useSelector(getUserTotalPoins);
    const incomePerSeconds = useSelector(earnIncomePerSeconds);
    const dispatch = useAppDispatch();
    const [savePointsMutation] = useSavePoints()
    
    useEffect(() => {
        const interval = setInterval(() => {
            if (incomePerSeconds) {
                dispatch(userActions.increaseUserPoints(incomePerSeconds))
            }
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [incomePerSeconds])

    useEffect(() => {
        const onExit = () => {
            savePointsMutation(totalPoints)
        };

        const handleBeforeUnload = () => {
            onExit();
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                onExit();
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [totalPoints]);



    return (
        <>
            {children}
        </>
    );
}