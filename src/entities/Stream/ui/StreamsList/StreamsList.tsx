import clsx from 'clsx';
import { Spinner, Text } from '@telegram-apps/telegram-ui';
import { Stream } from '../../model/types/stream';
import { StreamsListItem } from '../StreamsListItem/StreamsListItem';
import { useGetStreamsList } from '../../api/streamApi';
import GamingImage from '@/shared/assets/img/streams/gaming.svg';
import TalkingImage from '@/shared/assets/img/streams/talking.svg';
import MarathonImage from '@/shared/assets/img/streams/marathon.svg';
import cls from './StreamsList.module.scss';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { gameActions } from '@/features/Game';
import { getGameChosedStream } from '@/features/Game/model/selectors/gameSelector';

interface StreamsListProps {
    className?: string;
    onClick?: (stream: Stream) => void;
    disabled?: boolean;
}

const StreamIcons = [
  GamingImage,
  TalkingImage,
  MarathonImage,
]

export const StreamsList: React.FC<StreamsListProps> = (props) => {
  const { className, onClick, disabled } = props;
  const { data: streams, isLoading, isError } = useGetStreamsList();
  const dispatch = useAppDispatch()
  const chosedStream = useSelector(getGameChosedStream)

  if (isLoading) {
    return <Spinner size="l" />;
  }

  if (isError) {
    return <Text>
      Error! Can't load stream types, check your connection.
    </Text>
  }

  const clickHandler = (stream: Stream) => {
    onClick?.(stream)
    dispatch(gameActions.choseStream(stream))
  }

  return (
    <div className={clsx(cls.streamsList, {}, [className])}>
      {
        streams?.map((stream) => (
          <StreamsListItem 
            key={stream.id} 
            stream={stream} 
            onClick={clickHandler} 
            disabled={disabled} 
            icon={StreamIcons[Number(stream.id) - 1]} 
            acitve={stream.id === chosedStream?.id}
          />
        ))
      }
    </div>
  );
};
