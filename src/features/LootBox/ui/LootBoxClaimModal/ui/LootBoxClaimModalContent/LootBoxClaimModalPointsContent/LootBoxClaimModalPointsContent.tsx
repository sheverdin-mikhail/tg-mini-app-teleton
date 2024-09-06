import { useSavePoints } from '@/features/Game';
import { lootBoxActions } from '@/features/LootBox/model/slice/lootBox';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getUserTotalPoins } from '@/entities/User';
import { ViewsIcon } from '@/shared/ui/ViewsIcon/ViewsIcon';
import { FontSize, FontWeight, Text } from '@/shared/ui/Text/Text';
import ViewsImage from '@/shared/assets/img/eye.png';
import { formatNumber } from '@/shared/lib/utils/formatNumber';
import { Button } from '@/shared/ui/Button/Button';
import cls from '../LootBoxClaimModalContent.module.scss';

interface LootBoxClaimModalPointsContentProps {
    className?: string;
    points: number; 
}

export const LootBoxClaimModalPointsContent: React.FC<LootBoxClaimModalPointsContentProps> = (props) => {
    const { points } = props;
    const [savePointsMutation, {isLoading}] = useSavePoints();
    const dispatch = useAppDispatch();
    const totalPoints = useSelector(getUserTotalPoins)

    const onClickHandler = () => {
        savePointsMutation(totalPoints + points)
        dispatch(lootBoxActions.closeModal())
    }

    return (
        <>
            <div className={cls.block}>
                <img src={ViewsImage} className={cls.img} />
                <Text className={cls.text} size={FontSize.LG} weight={FontWeight.MEDIUM}>Congratulations! Here is your reward!</Text>
            </div>

            <Text className={cls.points} size={FontSize.LG} weight={FontWeight.MEDIUM}><ViewsIcon className={cls.icon} /> {formatNumber(points.toString())} </Text>

            <Button disabled={isLoading} loading={isLoading} onClick={onClickHandler} className={cls.button}>Cool!</Button>
        </>
    );
}