import clsx from 'clsx';
import { PageContentHeader } from '@/widgets/PageContentHeader';
import { BoostsList } from '@/features/BoostsList';
import cls from './BoostPage.module.scss';
import { LootBoxList } from '@/features/LootBox/ui/LootBoxList/LootBoxList';

interface BoostPageProps {
  className?: string;
}


export const BoostPage: React.FC<BoostPageProps> = (props) => {
  const { className } = props;

  return (
      <div className={clsx(cls.boostPage, {}, [className])}>
        <PageContentHeader title="Networking and view opportunites" description="Make a choise to boost or ..." />
        <BoostsList />
        <LootBoxList />
      </div>
  );
};
