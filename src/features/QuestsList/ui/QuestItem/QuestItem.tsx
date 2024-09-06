import clsx from 'clsx';
import { Quest, QuestIcon, QuestStatus } from '@/entities/Quest';
import { useQuestClaim, useQuestVerify } from '../../api/questsListApi';
import { initUtils } from '@telegram-apps/sdk';
import { Card } from '@/shared/ui/Card/Card';
import { FontSize, FontWeight, Text } from '@/shared/ui/Text/Text';
import EnergyIcon from '@/shared/assets/img/energy.png';
import StreamIcon from '@/shared/assets/img/live.png';
import TelegramIcon from '@/shared/assets/img/tg.png';
import TwitterIcon from '@/shared/assets/img/twitter.png';

import cls from './QuestItem.module.scss';
import { Button, ButtonSize } from '@/shared/ui/Button/Button';
import { ViewsIcon } from '@/shared/ui/ViewsIcon/ViewsIcon';
import { formatNumber } from '@/shared/lib/utils/formatNumber';

interface QuestItemProps {
  className?: string;
  item: Quest;
}

export const QuestItem: React.FC<QuestItemProps> = (props) => {
  const { className, item } = props;

  const QuestIcons: Record<QuestIcon, string> = {
    [QuestIcon.ENERGY]: EnergyIcon,
    [QuestIcon.STREAM]: StreamIcon,
    [QuestIcon.TELEGRAM]: TelegramIcon,
    [QuestIcon.TWITTER]: TwitterIcon,
  }
  

  const [questVerifyMutation, { isLoading }] = useQuestVerify();
  const [questClaimMutation] = useQuestClaim();
  const utils = initUtils()

  const buttonClickHandler = (item: Quest) => () => {
    if (item.status === QuestStatus.START) {
      item.settings.link && utils.openLink(item.settings.link)
      questVerifyMutation(item.id);
    } else if (item.status === QuestStatus.CLAIM) {
      questClaimMutation(item.id);
    }
  };

  return (
    <Card key={item.id} className={clsx(cls.questItem, className)}>
      {
        item?.settings?.iconType && <img className={cls.icon} src={QuestIcons[item.settings.iconType]} />
      }
      <div className={cls.col}>
        <Text className={cls.title} weight={FontWeight.MEDIUM}>
        {item.settings.title} {item.settings.description}
        </Text>
        <Text className={cls.description} size={FontSize.LG} weight={FontWeight.MEDIUM} >
          <ViewsIcon/> {formatNumber(item?.reward?.toString() ?? '0')}
        </Text>
      </div>
      {/* {
        (item.settings.action === 'boosts' || item.settings.action === 'streams') && (
          <Text className={cls.description} >
            {
              item.settings.action === 'streams'
              ? <span>{userDailyStreams ?? 0} / {item.settings.count ?? 0}</span>
              : <span>{boostCount ?? 0} / {item.settings.count ?? 0}</span>
            } 
          </Text>
        )
      } */}
      {
        item.settings.buttonTitle && (
          <Button
            size={ButtonSize.SMALL}
            className={cls.button}
            disabled={item.status === QuestStatus.DONE}
            onClick={buttonClickHandler(item)}
            loading={isLoading}
          >
            {item.status === QuestStatus.CLAIM ? 'Claim' : item.settings.buttonTitle}
          </Button>
        )
      }
    </Card>
  );
};
