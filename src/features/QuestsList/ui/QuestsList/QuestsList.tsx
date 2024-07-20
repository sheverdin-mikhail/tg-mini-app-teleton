import clsx from 'clsx';
import { Quest } from 'entities/Quest';
import { useMemo } from 'react';
import { Title } from '@telegram-apps/telegram-ui';
import cls from './QuestsList.module.scss';
import { useQuestsList } from '../../model/api/questsListApi';
import { QuestsListSkeleton } from '../QuestsListSkeleton/QuestsListSkeleton';
import { QuestsListItem } from '../QuestsListItem/QuestsListItem';

interface QuestsListProps {
  className?: string;
}

const questsList: Quest[] = [
  {
    id: '1',
    section: 'Onboarding',
    settings: {
      title: 'Subscribe to Juicybet',
      action: 'follow',
      header: '20 points',
      channel: 'juicybet',
      iconType: 'telegram',
      buttonTitle: 'Subscribe',
      description: 'Telegram channel',
      skipChecking: false,
    },
    status: 'Start',
  },
  {
    id: '2',
    section: 'Onboarding',
    settings: {
      link: 'https://twitter.com/YourJuicyBets',
      title: 'Follow Juicybet',
      action: 'link',
      header: '10 points',
      iconType: 'twitter',
      buttonTitle: 'Open link',
      description: 'on Twitter',
      skipChecking: true,
    },
    status: 'Start',
  },
  {
    id: '3',
    section: 'Onboarding',
    settings: {
      link: 'https://discord.com/invite/JuicyBet',
      title: 'Follow Juicybet',
      action: 'link',
      header: '10 points',
      iconType: 'discord',
      buttonTitle: 'Open link',
      description: 'on Discord',
      skipChecking: true,
    },
    status: 'Start',
  },
  {
    id: '4',
    section: 'Specials',
    settings: {
      link: 'https://t.me/JuicyBetAppBot',
      title: 'Complete registration at the JuicyBet Telegram App',
      action: 'juicy_bet_register',
      header: 'Get rewards in FreeBets, JSP from JuicyBet',
      iconType: 'telegram',
      buttonTitle: 'Register',
      description: '',
      skipChecking: false,
    },
    status: 'Start',
  },
  {
    id: '5',
    section: 'Specials',
    settings: {
      link: 'https://t.me/jb_testi_bot',
      count: 10,
      title: 'Invite 10 friends',
      action: 'referrals',
      header: '10 points',
      iconType: 'referrals',
      buttonTitle: 'invite',
      description: '',
      skipChecking: false,
    },
    status: 'Start',
  },
];

export const QuestsList: React.FC<QuestsListProps> = (props) => {
  const { className } = props;

  const { data, isLoading } = useQuestsList('');

  const sections: Record<string, Quest[]> = useMemo(() => (data?.data ?? questsList).reduce((acc: Record<string, Quest[]>, item: Quest) => {
    if (acc[item.section]) {
      acc[item.section].push(item);
    } else {
      acc[item.section] = [];
      acc[item.section].push(item);
    }
    return acc;
  }, {}), [data?.data]);

  return (
    <div className={clsx(cls.questsList, {}, [className])}>
      {
        isLoading
          ? <QuestsListSkeleton />
          : (
            <>
              {
                Object.keys(sections).map((item) => (
                  <div className={cls.section} key={item}>
                    <Title caps weight="1" className={cls.sectionTitle}>
                      {item}
                    </Title>
                    <div className={cls.sectionItems}>
                      {
                        sections[item].map((item: Quest) => (
                          <QuestsListItem item={item} key={item.id} />
                        ))
                      }
                    </div>
                  </div>
                ))
              }
            </>
          )
      }
    </div>
  );
};
