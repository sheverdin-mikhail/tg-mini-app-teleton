import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";

interface ReferralLinkLoadingProps {
    className?: string;
}

export const ReferralLinkLoading: React.FC<ReferralLinkLoadingProps> = () => {

    return (
        <>
            <Skeleton width="100%" height="82px" />   
        </>
    );
}