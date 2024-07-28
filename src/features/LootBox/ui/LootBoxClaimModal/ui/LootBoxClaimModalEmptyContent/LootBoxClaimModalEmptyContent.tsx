import clsx from 'clsx';
import cls from './LootBoxClaimModalEmptyContent.module.scss';
import { Button, Title } from '@telegram-apps/telegram-ui';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { lootBoxActions } from '@/features/LootBox/model/slice/lootBox';

interface LootBoxClaimModalEmptyContentProps {
    className?: string;
}

export const LootBoxClaimModalEmptyContent: React.FC<LootBoxClaimModalEmptyContentProps> = (props) => {
    const { className } = props;

    const dispatch = useAppDispatch();

    const onClickHandler = () => {
        dispatch(lootBoxActions.closeModal())
    }

    return (
        <div className={clsx(cls.content, {}, [className])}>
            <Title weight="1" className={cls.text}>Unluck:( You got nothing, try again!</Title>
            <Button onClick={onClickHandler}>Ok!</Button>
        </div>
    );
}