import { PageContentHeader } from '@/widgets/PageContentHeader';
import { QuestsList } from '@/features/QuestsList';
import EarnPageImage from '@/shared/assets/img/eye.png';
import { Container } from '@/shared/ui/Container/Container';
import cls from './EarnPage.module.scss';
import { DailyRewardCard } from '@/features/DailyRewards';

interface EarnPageProps {
    className?: string;
}

export const EarnPage: React.FC<EarnPageProps> = () => {


  return (
    <div className={cls.earnPage}>
      <PageContentHeader title="Get more views" description='Daily earnings' img={EarnPageImage} />
      <Container>
        <DailyRewardCard />
        <QuestsList className={cls.questsList} />
      </Container>
    </div>
  )
};
