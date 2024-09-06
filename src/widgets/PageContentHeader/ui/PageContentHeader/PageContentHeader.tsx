import clsx from 'clsx';
import { FontSize, FontWeight, Text, TextColor } from '@/shared/ui/Text/Text';
import cls from './PageContentHeader.module.scss';

interface PageContentHeaderProps {
    className?: string;
    title: string;
    description?: string;
    img?: string;
}

export const PageContentHeader: React.FC<PageContentHeaderProps> = (props) => {
  const { className, title, description, img } = props;

  return (
    <div className={clsx(cls.pageContentHeader, {}, [className])}>
      {
        img && <img src={img} className={cls.image} />
      }
      <Text className={cls.title} weight={FontWeight.BLACK} size={FontSize.XL}>{title}</Text>
      {
        description && <Text className={cls.description} color={TextColor.SECONDARY} size={FontSize.LG}>{description}</Text>
      }
    </div>
  );
};
