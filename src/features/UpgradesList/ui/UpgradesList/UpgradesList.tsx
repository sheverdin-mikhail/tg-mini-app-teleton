import clsx from 'clsx';
import { useGetUpgradesList } from '../../api/upgradesListApi';
import cls from './UpgradesList.module.scss';
import { UpgradesListItem } from '../UpgradesListItem/UpgradesListItem';
import { Text, Title } from '@telegram-apps/telegram-ui';

interface UpgradesListProps {
    className?: string;
}

export const UpgradesList: React.FC<UpgradesListProps> = (props) => {
    const { className } = props;
    const { data: upgradesList, isError } = useGetUpgradesList(null, {
        refetchOnReconnect: true
    });

    if (isError) {
        return <div className={cls.upgradesList}>
            <Title caps weight='1'>
                Upgrades
            </Title>
            <Text style={{ textAlign: "start" }}>
                Error! Can't load Upgrades list, check your connection.
            </Text>
        </div>
    }

    if (!upgradesList?.length) {
        return <div className={cls.upgradesList}>
            <Title caps weight='1'>
                Upgrades
            </Title>
            <Text style={{ textAlign: "start" }}>
                Upgrades list is empty.
            </Text>
        </div>
    }

    return (
        <div className={clsx(cls.upgradesList, {}, [className])}>
            <Title caps weight='1'>
                Upgrades
            </Title>
            <div className={cls.list}>
                {
                    upgradesList?.map((upgrade) => (
                        <UpgradesListItem className={cls.item} item={upgrade} key={upgrade.id} />
                    ))
                }
            </div>
        </div>
    );
}