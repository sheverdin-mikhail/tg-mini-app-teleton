import { PageContentHeader } from '@/widgets/PageContentHeader';
import { QuestsList } from '@/features/QuestsList';
import { DailyRewards } from '@/features/DailyRewards';
import cls from './EarnPage.module.scss';

interface EarnPageProps {
    className?: string;
}

export const EarnPage: React.FC<EarnPageProps> = () => (
  <>
    <PageContentHeader title="Speed up your sreamer's promotion" description="Complete free tasks - get views" />
    <DailyRewards />
    <QuestsList className={cls.questsList} />
  </>
);
