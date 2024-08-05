import clsx from 'clsx';
import cls from './LootBoxClaimModalPointsContent.module.scss';
import ViewsIcon from '@/shared/assets/icons/views-icon.svg';
import { Button, Title } from '@telegram-apps/telegram-ui';
import { useSavePoints } from '@/features/Game';
import { lootBoxActions } from '@/features/LootBox/model/slice/lootBox';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getUserTotalPoins } from '@/entities/User';

interface LootBoxClaimModalPointsContentProps {
    className?: string;
    points: number; 
}

export const LootBoxClaimModalPointsContent: React.FC<LootBoxClaimModalPointsContentProps> = (props) => {
    const { className, points } = props;
    const [savePointsMutation] = useSavePoints();
    const dispatch = useAppDispatch();
    const totalPoints = useSelector(getUserTotalPoins)

    const onClickHandler = () => {
        savePointsMutation(totalPoints + points)
        dispatch(lootBoxActions.closeModal())
    }

    return (
        <div className={clsx(cls.content, {}, [className])}>
            <Title weight="1" className={cls.text}>Your reward is <br/><span className={cls.points}>{points} <ViewsIcon className={cls.icon} /></span> </Title>

            <Button onClick={onClickHandler}>Cool!</Button>
        </div>
    );
}