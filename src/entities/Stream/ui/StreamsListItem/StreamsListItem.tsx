import clsx from 'clsx';
import { useCallback } from 'react';
import { Text } from '@telegram-apps/telegram-ui';
import { InlineButtonsItem } from '@telegram-apps/telegram-ui/dist/components/Blocks/InlineButtons/components/InlineButtonsItem/InlineButtonsItem';
import cls from './StreamsListItem.module.scss';
import { Stream } from '../../model/types/stream';
import { AwesomeIcon } from '@/shared/ui/AwesomeIcon/AwesomeIcon';

interface StreamsListItemProps {
    className?: string;
    stream: Stream;
    onClick?: (stream: Stream) => void
    disabled?: boolean;
    icon?: string;
}

export const StreamsListItem: React.FC<StreamsListItemProps> = (props) => {
  const {
    className,
    stream,
    onClick,
    disabled,
    icon
  } = props;

  const onClickHandler = useCallback(() => {
    onClick?.(stream);
  }, [stream, onClick]);

  return (
    <InlineButtonsItem
      className={clsx(cls.streamsListItem, {}, [className])}
      onClick={onClickHandler}
      mode="bezeled"
      disabled={disabled}
    >
      <AwesomeIcon icon={icon} className={cls.icon} />
      <Text className={cls.text} weight="1" caps><span className={cls.text}>{stream.title}</span></Text>
    </InlineButtonsItem>
  );
};
