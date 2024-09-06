import clsx from 'clsx';
import { ReferralFriend } from '@/entities/Referral';
import { Card } from '@/shared/ui/Card/Card';
import AvatarImage from '@/shared/assets/img/avatar-placeholder.png';
import cls from './FriendsListItem.module.scss';
import { FontWeight, Text } from '@/shared/ui/Text/Text';

interface FriendsListItemProps {
    className?: string;
    item: ReferralFriend
}

export const FriendsListItem: React.FC<FriendsListItemProps> = (props) => {
    const { className, item } = props;

    return (
        <Card className={clsx(cls.friendsListItem, {}, [className])}>
            <img src={AvatarImage} className={cls.avatar} />
            <div>
                <Text weight={FontWeight.MEDIUM}>{item.firstName}</Text> {item.lastName && <Text weight={FontWeight.MEDIUM}>{item.lastName}</Text>}
            </div>
        </Card>
    );
}