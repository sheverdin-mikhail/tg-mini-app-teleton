import clsx from 'clsx';
import { useGetUpgradesList } from '../../api/upgradesListApi';
import cls from './UpgradesList.module.scss';
import { UpgradesListItem } from '../UpgradesListItem/UpgradesListItem';
import { Title } from '@telegram-apps/telegram-ui';

interface UpgradesListProps {
    className?: string;
}

export const UpgradesList: React.FC<UpgradesListProps> = (props) => {
    const { className } = props;
    const { data: upgradesList } = useGetUpgradesList();


    return (
        <div className={clsx(cls.upgradesList, {}, [className])}>
            <Title caps weight='1'>
                Upgrades
            </Title>
            <div className={cls.list}>
                {
                    upgradesList?.map((upgrade) => (
                        <UpgradesListItem className={cls.item} item={upgrade} />
                    ))
                }
            </div>
        </div>
    );
}