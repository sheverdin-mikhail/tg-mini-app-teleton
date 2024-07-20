import clsx from 'clsx';
import cls from './QuestsList.module.scss';
import { useQuestsList } from '../../model/api/questsListApi';

interface QuestsListProps {
    className?: string;
}

export const QuestsList: React.FC<QuestsListProps> = (props) => {
  const { className } = props;

  const { isLoading, data } = useQuestsList('');
  console.log('data', data);
  console.log('url', process.env.REACT_APP_API_BASE_URL);

  return (
    <div className={clsx(cls.questsList, {}, [className])}>
      {/* {
        data
      } */}
    </div>
  );
};
