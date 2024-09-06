import clsx from 'clsx';
import { Quest, QuestItem } from '@/entities/Quest';
import { useMemo } from 'react';
import cls from './QuestsList.module.scss';
import { useQuestsList } from '../../api/questsListApi';
import { QuestsListSkeleton } from '../QuestsListSkeleton/QuestsListSkeleton';
import { FontSize, Text, TextColor } from '@/shared/ui/Text/Text';

interface QuestsListProps {
  className?: string;
}

export const QuestsList: React.FC<QuestsListProps> = (props) => {
  const { className } = props;

  const { data: questsData, isLoading, isError } = useQuestsList(null, {
    refetchOnReconnect: true
  });

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
          <Text className={cls.title} color={TextColor.SECONDARY} size={FontSize.LG}>
            {item}
          </Text>
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
    
    if (isError) {
      return <Text>Error! Can't load Quests list, check your connection.</Text>;
    }

    return (
      <Text>Quests list is empty</Text>
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
