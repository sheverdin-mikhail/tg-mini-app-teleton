import clsx from 'clsx';
import { InlineButtons, Spinner } from '@telegram-apps/telegram-ui';
import cls from './StreamsList.module.scss';
import { Stream } from '../../model/types/stream';
import { StreamsListItem } from '../StreamsListItem/StreamsListItem';
import { useGetStreamsList } from '../../api/streamApi';

interface StreamsListProps {
    className?: string;
    onClick?: (stream: Stream) => void;
    disabled?: boolean;
}

export const StreamsList: React.FC<StreamsListProps> = (props) => {
  const { className, onClick, disabled } = props;
  const { data: streams, isLoading } = useGetStreamsList();

  if (isLoading) {
    return <Spinner size="l" />;
  }

  return (
    // @ts-ignore
    <InlineButtons className={clsx(cls.streamsList, {}, [className])}>
      {
        streams?.map((stream) => (
          <StreamsListItem key={stream.id} stream={stream} onClick={onClick} disabled={disabled} />
        ))
      }
    </InlineButtons>
  );
};
