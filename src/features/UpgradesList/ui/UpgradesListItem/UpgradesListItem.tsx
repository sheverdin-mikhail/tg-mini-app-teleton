import clsx from 'clsx';
import cls from './UpgradesListItem.module.scss';
import { Upgrade } from '@/entities/Upgrade';
import { Badge, Title } from '@telegram-apps/telegram-ui';
// import { ViewsIcon } from '@/shared/ui/ViewsIcon/ViewsIcon';

interface UpgradesListItemProps {
    className?: string;
    item: Upgrade;
}

export const UpgradesListItem: React.FC<UpgradesListItemProps> = (props) => {
    const { className, item: upgrade } = props;


    return (
        <div className={clsx(cls.upgradesListItem, {}, [className])}>
            <Badge type='number' className={cls.badge}>
                Soon
            </Badge>
            <div className={cls.block}>
                <Title className={cls.title} weight='1'>
                    {upgrade.title}
                </Title>
                {/* <Text className={cls.text}>+ {upgrade.incomePerDayDelta} / day </Text> */}
            </div>
            {/* <Button className={cls.button} disabled>
                <span className={cls.buttonContent}>
                    {upgrade.cost} <ViewsIcon />
                </span>
            </Button> */}
        </div>
    );
}