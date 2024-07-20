import clsx from 'clsx';
import { Quest } from 'entities/Quest';
import {
  Button,
  Headline,
  Image,
  Text,
} from '@telegram-apps/telegram-ui';
import cls from './QuestsListItem.module.scss';

interface QuestsListItemProps {
    className?: string;
    item: Quest;
}

export const QuestsListItem: React.FC<QuestsListItemProps> = (props) => {
  const { className, item } = props;

  const buttonClickHandler = (link: string) => () => {
  };

  return (
    <div key={item.id} className={clsx(cls.questsListItem, className)}>
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
        item.settings.link && <Button size="s" className={cls.button} onClick={buttonClickHandler(item.settings.link)}>{item.settings.buttonTitle}</Button>
      }
    </div>
  );
};
