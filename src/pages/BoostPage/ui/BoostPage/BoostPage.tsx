import clsx from 'clsx';
import { PageContentHeader } from '@/widgets/PageContentHeader';
import { BoostsList } from '@/features/BoostsList';
import cls from './BoostPage.module.scss';
import { LootBoxList } from '@/features/LootBox/ui/LootBoxList/LootBoxList';
import { UpgradesList } from '@/features/UpgradesList/ui/UpgradesList/UpgradesList';
import BoostPageImage from '@/shared/assets/img/rocket.png'
import { Container } from '@/shared/ui/Container/Container';

interface BoostPageProps {
  className?: string;
}


export const BoostPage: React.FC<BoostPageProps> = (props) => {
  const { className } = props;

  return (
      <div className={clsx(cls.boostPage, {}, [className])}>
        <PageContentHeader 
          title="Networking and view opportunites" 
          description="Make a choise to boost" 
          img={BoostPageImage} 
        />
        <Container className={cls.container}>
          <BoostsList />
          <UpgradesList />
          <LootBoxList />
        </Container>
      </div>
  );
};
