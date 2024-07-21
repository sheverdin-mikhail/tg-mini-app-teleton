import clsx from 'clsx';
import { Quest, QuestItem } from 'entities/Quest';
import { useMemo } from 'react';
import { Text, Title } from '@telegram-apps/telegram-ui';
import cls from './QuestsList.module.scss';
import { useQuestsList } from '../../api/questsListApi';
import { QuestsListSkeleton } from '../QuestsListSkeleton/QuestsListSkeleton';

interface QuestsListProps {
  className?: string;
}

export const QuestsList: React.FC<QuestsListProps> = (props) => {
  const { className } = props;

  const { data: questsData, isLoading } = useQuestsList(null);

  const sections: Record<string, Quest[]> | undefined = useMemo(() => questsData?.data?.reduce((acc: Record<string, Quest[]>, item: Quest) => {
    if (acc[item.section]) {
      acc[item.section].push(item);
    } else {
      acc[item.section] = [];
      acc[item.section].push(item);
    }
    return acc;
  }, {}), [questsData?.data]);

  const sectionsList = useMemo(() => {
    if (sections) {
      return Object.keys(sections).map((item) => (
        <div className={cls.section} key={item}>
          <Title caps weight="1" className={cls.sectionTitle}>
            {item}
          </Title>
          <div className={cls.sectionItems}>
            {
              sections[item].map((item: Quest) => (
                <QuestItem item={item} key={item.id} />
              ))
            }
          </div>
        </div>
      ));
    }
    return (
      <div>
        <Text>Список задач пуст</Text>
      </div>
    );
  }, [sections]);

  return (
    <div className={clsx(cls.questsList, {}, [className])}>
      {
        isLoading
          ? <div className={cls.sectionItems}><QuestsListSkeleton /></div>
          : sectionsList
      }
    </div>
  );
};
