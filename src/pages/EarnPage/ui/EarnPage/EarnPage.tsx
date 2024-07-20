import clsx from 'clsx';
import { PageContentHeader } from 'widgets/PageContentHeader';
import { QuestsList } from 'features/QuestsList';
import cls from './EarnPage.module.scss';

interface EarnPageProps {
    className?: string;
}

export const EarnPage: React.FC<EarnPageProps> = (props) => {
  const { className } = props;

  return (
    <div className={clsx(cls.earnPage, {}, [className])}>
      <PageContentHeader title="Speed up your sreamer's promotion" description="Complete free tasks - get views" />
      <QuestsList />
    </div>
  );
};
