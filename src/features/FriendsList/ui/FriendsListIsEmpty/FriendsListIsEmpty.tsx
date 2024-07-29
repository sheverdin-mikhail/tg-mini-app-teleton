import { Text } from '@telegram-apps/telegram-ui';
import cls from './FriendsListIsEmpty.module.scss'

interface FriendsListIsEmptyProps {
    className?: string;
}

export const FriendsListIsEmpty: React.FC<FriendsListIsEmptyProps> = () => {

    return (
        <Text className={cls.text}>Here is epmty</Text>
    );
}