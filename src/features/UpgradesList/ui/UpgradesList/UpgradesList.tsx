import clsx from 'clsx';
import { useGetUpgradesList } from '../../api/upgradesListApi';
import cls from './UpgradesList.module.scss';
import { UpgradesListItem } from '../UpgradesListItem/UpgradesListItem';
import { FontSize, Text, TextColor } from '@/shared/ui/Text/Text';

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
            <Text color={TextColor.SECONDARY} size={FontSize.LG}>
                Upgrades
            </Text>
            <Text style={{ textAlign: "start" }}>
                Error! Can't load Upgrades list, check your connection.
            </Text>
        </div>
    }

    if (!upgradesList?.length) {
        return <div className={cls.upgradesList}>
            <Text color={TextColor.SECONDARY} size={FontSize.LG}>
                Upgrades
            </Text>
            <Text style={{ textAlign: "start" }}>
                Upgrades list is empty.
            </Text>
        </div>
    }

    return (
        <div className={clsx(cls.upgradesList, {}, [className])}>
            <Text color={TextColor.SECONDARY} size={FontSize.LG}>
                Upgrades
            </Text>
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