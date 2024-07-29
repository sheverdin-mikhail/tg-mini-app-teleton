import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";

interface FriendsListLoadingProps {
    className?: string;
}

export const FriendsListLoading: React.FC<FriendsListLoadingProps> = () => {

    return (
        <>
            <Skeleton width="auto" />
            <Skeleton width="auto" />
            <Skeleton width="auto" />
        </>
    );
}