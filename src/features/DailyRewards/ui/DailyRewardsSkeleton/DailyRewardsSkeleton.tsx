import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

interface DailyRewardsSkeletonProps {
    className?: string;
}

export const DailyRewardsSkeleton: React.FC<DailyRewardsSkeletonProps> = () => (
  <>
    <Skeleton width="auto" height="60px" />
    <Skeleton width="auto" height="60px" />
    <Skeleton width="auto" height="60px" />
    <Skeleton width="auto" height="60px" />
    <Skeleton width="auto" height="60px" />
    <Skeleton width="auto" height="60px" />
  </>
);
