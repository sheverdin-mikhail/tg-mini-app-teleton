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
import { initUtils } from '@telegram-apps/sdk';
import { useSelector } from 'react-redux';
import { getUserDailyStreamsCount, makeGetUserBoost } from '@/entities/User';
import { StateSchema } from '@/app/providers';

interface QuestItemProps {
    className?: string;
    item: Quest;
}

export const QuestItem: React.FC<QuestItemProps> = (props) => {
  const { className, item } = props;

  const [questVerifyMutation, { isLoading }] = useQuestVerify();
  const [questClaimMutation] = useQuestClaim();
  const utils = initUtils()
  const userDailyStreams = useSelector(getUserDailyStreamsCount)
  const getUserBoost = makeGetUserBoost();
  const boostCount = useSelector((state: StateSchema) => getUserBoost(state, item.settings.boostId ?? ''))?.dailyUseCount;

  const buttonClickHandler = (item: Quest) => () => {
    if (item.status === QuestStatus.START) {
      item.settings.link && utils.openLink(item.settings.link)
      questVerifyMutation(item.id);
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
      {
        (item.settings.action === 'boosts' || item.settings.action === 'streams') && (
          <Text className={cls.description} weight="3">
            {
              item.settings.action === 'streams'
              ? <span>{userDailyStreams ?? 0} / {item.settings.count ?? 0}</span>
              : <span>{boostCount ?? 0} / {item.settings.count ?? 0}</span>
            } 
          </Text>
        )
      }
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
