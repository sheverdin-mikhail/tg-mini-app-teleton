import { Skeleton } from 'shared/ui/Skeleton/Skeleton';

interface QuestsListSkeletonProps {
    className?: string;
}

export const QuestsListSkeleton: React.FC<QuestsListSkeletonProps> = (props) => (
  <>
    <Skeleton width="auto" height="120px" />
    <Skeleton width="auto" height="120px" />
    <Skeleton width="auto" height="120px" />
    <Skeleton width="auto" height="120px" />

    <Skeleton width="auto" height="120px" />
    <Skeleton width="auto" height="120px" />
    <Skeleton width="auto" height="120px" />
    <Skeleton width="auto" height="120px" />
  </>
);
