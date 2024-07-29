import clsx from 'clsx';
import cls from './FriendsListItem.module.scss';
import { ReferralFriend } from '@/entities/Referral';
import { Text } from '@telegram-apps/telegram-ui';

interface FriendsListItemProps {
    className?: string;
    item: ReferralFriend
}

export const FriendsListItem: React.FC<FriendsListItemProps> = (props) => {
    const { className, item } = props;

    return (
        <div className={clsx(cls.friendsListItem, {}, [className])}>
            <Text>{item.firstName}</Text>
            {item.lastName && <Text>{item.lastName}</Text>}
        </div>
    );
}