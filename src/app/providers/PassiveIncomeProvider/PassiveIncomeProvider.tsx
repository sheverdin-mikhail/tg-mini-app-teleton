import { getEarnIncomePerDay, getUserTotalPoins, userActions } from "@/entities/User";
import { useSavePoints } from "@/features/Game";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";

interface PassiveIncomeProviderProps {
    children: ReactElement
}

export const PassiveIncomeProvider: React.FC<PassiveIncomeProviderProps> = ({children}) => {

    const totalPoints = useSelector(getUserTotalPoins);
    const earnIncomePerDay = useSelector(getEarnIncomePerDay)
    const dispatch = useAppDispatch();
    const [savePointsMutation] = useSavePoints()
    
    useEffect(() => {
        const interval = setInterval(() => {
            let earnIncomePerSeconds = Number(earnIncomePerDay) / 86400;
            if (earnIncomePerSeconds) {
                dispatch(userActions.increaseUserPoints(earnIncomePerSeconds))
            }
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [earnIncomePerDay])

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