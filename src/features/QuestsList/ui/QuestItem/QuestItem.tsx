import clsx from 'clsx';
import { Quest, QuestStatus } from '@/entities/Quest';
import {
  Button,
  Headline,
  Image,
  Text,
} from '@telegram-apps/telegram-ui';
import cls from './QuestItem.module.scss';
import { useQuestClaim, useQuestVerify } from '../../api/questsListApi';

interface QuestItemProps {
    className?: string;
    item: Quest;
}

export const QuestItem: React.FC<QuestItemProps> = (props) => {
  const { className, item } = props;

  const [questVerifyMutation, { isLoading }] = useQuestVerify();
  const [questClaimMutation] = useQuestClaim();

  const buttonClickHandler = (item: Quest) => () => {
    if (item.status === QuestStatus.START) {
      questVerifyMutation(item.id);
      if (item.settings.link) {
        window.open(item?.settings.link, "blank");
      }
    } else if (item.status === QuestStatus.CLAIM) {
      questClaimMutation(item.id);
    }
  };

  return (
    <div key={item.id} className={clsx(cls.questItem, className)}>
      {
        item.settings.image && <Image src={item.settings.image} />
      }
      <Text caps className={cls.title} weight="1">
        {item.settings.title}
      </Text>
      <Text className={cls.description} weight="3">
        {item.settings.description}
      </Text>
      <Headline className={cls.header} caps weight="1">
        {item.settings.header}
      </Headline>
      {
        item.settings.buttonTitle && (
          <Button
            size="s"
            className={cls.button}
            disabled={item.status === QuestStatus.DONE}
            onClick={buttonClickHandler(item)}
            loading={isLoading}
          >
            {item.status === QuestStatus.CLAIM ? 'Claim' : item.settings.buttonTitle}
          </Button>
        )
      }
    </div>
  );
};
