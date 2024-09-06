import clsx from 'clsx';
import { useCallback } from 'react';
import { Stream } from '../../model/types/stream';
import { Icon } from '@/shared/ui/Icon/Icon';
import cls from './StreamsListItem.module.scss';
import { FontWeight, Text } from '@/shared/ui/Text/Text';

interface StreamsListItemProps {
  className?: string;
  stream: Stream;
  onClick?: (stream: Stream) => void
  disabled?: boolean;
  icon?:  React.VFC<React.SVGProps<SVGElement>>;
  acitve?: boolean;
  
}

export const StreamsListItem: React.FC<StreamsListItemProps> = (props) => {
  const {
    className,
    stream,
    onClick,
    disabled,
    icon,
    acitve = false
  } = props;

  const onClickHandler = useCallback(() => {
    onClick?.(stream);
  }, [stream, onClick]);

  return (
    <button
      className={clsx(cls.streamsListItem, {}, [className])}
      onClick={onClickHandler}
      disabled={disabled}
    >
      <div className={clsx(cls.content, {[cls.active]: acitve})}>
        {
          icon && <Icon Svg={icon} className={cls.icon} />
        }
        <Text className={cls.text} weight={FontWeight.MEDIUM}><span className={cls.text}>{stream.title}</span></Text>
      </div>
    </button>
  );
};
