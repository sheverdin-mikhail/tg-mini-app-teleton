import clsx from 'clsx';
import { Upgrade, UpgradeIcon } from '@/entities/Upgrade';
import { ViewsIcon } from '@/shared/ui/ViewsIcon/ViewsIcon';
import { useSelector } from 'react-redux';
import { getUserTotalPoins } from '@/entities/User';
import { useBuyUpgrade } from '../../api/upgradesListApi';
import { Card } from '@/shared/ui/Card/Card';
import { FontSize, FontWeight, Text, TextColor } from '@/shared/ui/Text/Text';
import { Button, ButtonSize } from '@/shared/ui/Button/Button';
import MicrophoneIcon from '@/shared/assets/img/upgrades/micro.png';
import CompIcon from '@/shared/assets/img/upgrades/comp.png';
import NeonIcon from '@/shared/assets/img/upgrades/neon.png';
import RecordIcon from '@/shared/assets/img/upgrades/record.png';
import TalismanIcon from '@/shared/assets/img/upgrades/talisman.png';
import cls from './UpgradesListItem.module.scss';
import { formatNumber } from '@/shared/lib/utils/formatNumber';

interface UpgradesListItemProps {
    className?: string;
    item: Upgrade;
}

const UpgradeIcons: Record<string, any> = {
    [UpgradeIcon.MICROPHONE]: MicrophoneIcon,
    [UpgradeIcon.COMPUTER_UPGRADE]: CompIcon,
    [UpgradeIcon.NEON_LIGHTS]: NeonIcon,
    [UpgradeIcon.RECORDING_A_STREAM]: RecordIcon,
    [UpgradeIcon.TALISMAN]: TalismanIcon,
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
        <Card className={clsx(cls.upgradesListItem, {}, [className])}>
            <div className={cls.iconBlock}>
                <img src={UpgradeIcons[upgrade.id]} alt={upgrade.id} className={cls.upgradeIcon} />
                <Text weight={FontWeight.BLACK} color={TextColor.SECONDARY} size={FontSize.SM} className={cls.lvl}>{upgrade.level} lvl</Text>
            </div>
            <div className={cls.block}>
                <Text weight={FontWeight.MEDIUM} className={cls.title}>
                    {upgrade.title}
                </Text>
                {
                    upgrade.level < upgrade.maxLevel && (
                        <div className={cls.description}>
                            <Text weight={FontWeight.MEDIUM} className={cls.reward}><ViewsIcon /> {formatNumber(upgrade.incomePerDayDelta.toString())}</Text>
                        </div>
                    ) 
                }
            </div>
            <Button 
                loading={isLoading}
                size={ButtonSize.SMALL} 
                className={cls.button} 
                disabled={(totalPoints < upgrade.cost || isLoading || upgrade.level >= upgrade.maxLevel)}
                onClick={onClickHanlder}
            >
                <span className={cls.buttonContent}>
                    {
                        upgrade.level < upgrade.maxLevel ? <><ViewsIcon className={cls.viewsIcon}/> {formatNumber(upgrade.cost.toString())}</>   : 'max lvl' 
                    }
                </span>
            </Button>
        </Card>
    );
}