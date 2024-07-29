import clsx from 'clsx';
import cls from './FriendsList.module.scss';
import { useGetFriendsList } from '@/entities/Referral';
import { FriendsListItem } from '../FriendsListItem/FriendsListItem';
import { FriendsListLoading } from '../FriendsListLoading/FriendsListLoading';
import { FriendsListIsEmpty } from '../FriendsListIsEmpty/FriendsListIsEmpty';
import { Title } from '@telegram-apps/telegram-ui';

interface FriendsListProps {
    className?: string;
}

export const FriendsList: React.FC<FriendsListProps> = (props) => {
    const { className } = props;
    const { data: friendsList, isLoading } = useGetFriendsList()

    if (isLoading) {
        return (
            <div className={clsx(cls.friendsList, {}, [className])}>
                <FriendsListLoading />
            </div>
        )
    }

    return (
        <div className={clsx(cls.friendsList, {}, [className])}>
             <Title weight="1" caps className={cls.title}>
                Friends
            </Title>
            {
                friendsList?.length 
                ? (
                    friendsList?.map(friend => (
                        <FriendsListItem item={friend} />
                    ))
                )
                : <FriendsListIsEmpty />
            }
        </div>
    );
}