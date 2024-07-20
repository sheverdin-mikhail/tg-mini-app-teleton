import clsx from 'clsx';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Game } from 'entities/Game';
import cls from './MainPage.module.scss';
import { mainPageReducer } from '../../model/slice/mainPageSlice';

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
      <div className={clsx(cls.mainPage, {}, [className])}>
        <Game className={cls.game} />
      </div>
    </DynamicModuleLoader>
  );
};
