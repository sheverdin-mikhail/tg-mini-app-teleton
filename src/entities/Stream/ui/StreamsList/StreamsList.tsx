import clsx from 'clsx';
import { InlineButtons, Spinner, Text } from '@telegram-apps/telegram-ui';
import cls from './StreamsList.module.scss';
import { Stream } from '../../model/types/stream';
import { StreamsListItem } from '../StreamsListItem/StreamsListItem';
import { useGetStreamsList } from '../../api/streamApi';

interface StreamsListProps {
    className?: string;
    onClick?: (stream: Stream) => void;
    disabled?: boolean;
}

const StreamIcons = [
  'fa-solid fa-gamepad',
  'fa-solid fa-comments',
  'fa-solid fa-person-running',
]

export const StreamsList: React.FC<StreamsListProps> = (props) => {
  const { className, onClick, disabled } = props;
  const { data: streams, isLoading, isError } = useGetStreamsList();

  if (isLoading) {
    return <Spinner size="l" />;
  }

  if (isError) {
    return <Text>
      Error! Can't load stream types, check your connection.
    </Text>
  }

  return (
    // @ts-ignore
    <InlineButtons className={clsx(cls.streamsList, {}, [className])}>
      {
        streams?.map((stream) => (
          <StreamsListItem key={stream.id} stream={stream} onClick={onClick} disabled={disabled} icon={StreamIcons[Number(stream.id) - 1]} />
        ))
      }
    </InlineButtons>
  );
};
