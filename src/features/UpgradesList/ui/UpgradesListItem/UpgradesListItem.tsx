import clsx from 'clsx';
import cls from './UpgradesListItem.module.scss';
import { Upgrade } from '@/entities/Upgrade';
import { Button, Text, Title } from '@telegram-apps/telegram-ui';
import { ViewsIcon } from '@/shared/ui/ViewsIcon/ViewsIcon';
import { useSelector } from 'react-redux';
import { getUserTotalPoins } from '@/entities/User';
import { useBuyUpgrade } from '../../api/upgradesListApi';

interface UpgradesListItemProps {
    className?: string;
    item: Upgrade;
}

export const UpgradesListItem: React.FC<UpgradesListItemProps> = (props) => {
    const { className, item: upgrade } = props;
    const totalPoints = useSelector(getUserTotalPoins);
    const [buyUpgradeMutation, {isLoading}] = useBuyUpgrade();

    const onClickHanlder = () => {
        buyUpgradeMutation({
            id: upgrade.id,
            level: upgrade.level + 1
        })
    }


    return (
        <div className={clsx(cls.upgradesListItem, {}, [className])}>
            <div className={cls.block}>
                <Title className={cls.title} weight='1'>
                    {upgrade.title}
                </Title>
                {
                    upgrade.level < upgrade.maxLevel && (
                        <div className={cls.description}>
                            <Text className={cls.text}>+ {upgrade.incomePerDayDelta} / day </Text>
                            <Text className={cls.text}>{upgrade.level} lvl</Text>
                        </div>
                    ) 
                }
            </div>
            <Button 
                loading={isLoading}
                size='s' 
                className={cls.button} 
                disabled={(totalPoints < upgrade.cost || isLoading || upgrade.level >= upgrade.maxLevel)}
                onClick={onClickHanlder}
            >
                <span className={cls.buttonContent}>
                    {
                        upgrade.level < upgrade.maxLevel ? <>{upgrade.cost} <ViewsIcon /></>   : 'max lvl' 
                    }
                </span>
            </Button>
        </div>
    );
}