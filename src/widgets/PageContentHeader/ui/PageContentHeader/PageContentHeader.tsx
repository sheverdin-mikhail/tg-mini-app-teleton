import clsx from 'clsx';
import { Text, Title } from '@telegram-apps/telegram-ui';
import cls from './PageContentHeader.module.scss';

interface PageContentHeaderProps {
    className?: string;
    title: string;
    description?: string;
}

export const PageContentHeader: React.FC<PageContentHeaderProps> = (props) => {
  const { className, title, description } = props;

  return (
    <div className={clsx(cls.pageContentHeader, {}, [className])}>
      <Title weight="1" caps className={cls.title}>{title}</Title>
      {
        description && <Text weight="3" className={cls.description}>{description}</Text>
      }
    </div>
  );
};
