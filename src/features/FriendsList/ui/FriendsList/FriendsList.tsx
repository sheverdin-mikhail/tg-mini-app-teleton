import clsx from 'clsx';
import cls from './FriendsList.module.scss';
import { useGetFriendsList } from '@/entities/Referral';
import { FriendsListItem } from '../FriendsListItem/FriendsListItem';
import { FriendsListLoading } from '../FriendsListLoading/FriendsListLoading';
import { FriendsListIsEmpty } from '../FriendsListIsEmpty/FriendsListIsEmpty';
import { FontSize, FontWeight, Text, TextColor } from '@/shared/ui/Text/Text';

interface FriendsListProps {
    className?: string;
}

export const FriendsList: React.FC<FriendsListProps> = (props) => {
    const { className } = props;
    const { data: friendsList, isLoading, isError } = useGetFriendsList()

    if (isLoading) {
        return (
            <div className={clsx(cls.friendsList, {}, [className])}>
                <FriendsListLoading />
            </div>
        )
    }

    if (isError) {
        return <>
        <Text className={cls.Text}>
            Friends
        </Text>
        <Text >Error! Can't load Upgrades list, check your connection.</Text>
        </>
    }

    return (
        <div className={clsx(cls.friendsList, {}, [className])}>
             <Text className={cls.Text} size={FontSize.LG} color={TextColor.SECONDARY}>
                Your friends <Text weight={FontWeight.MEDIUM} color={TextColor.PRIMARY}>({friendsList?.length ?? 0})</Text>
            </Text>
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