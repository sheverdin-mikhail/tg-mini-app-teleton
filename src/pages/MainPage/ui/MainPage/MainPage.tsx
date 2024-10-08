import clsx from 'clsx';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  Game,
} from '@/features/Game';
import { LevelUpModal } from '@/features/LevelUpModal';
import { mainPageReducer } from '../../model/slice/mainPageSlice';
import cls from './MainPage.module.scss';
import { Header } from '@/widgets/Header';

interface MainPageProps {
  className?: string;
}

const reducers: ReducersList = {
  mainPage: mainPageReducer,
};

export const MainPage: React.FC<MainPageProps> = (props) => {
  const { className } = props;

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Header />
      <div className={clsx(cls.mainPage, {}, [className])}>
        <Game className={cls.game} />
      </div>
      <LevelUpModal />
    </DynamicModuleLoader>
  );
};
