import clsx from 'clsx';
import { Modal } from '@/shared/ui/Modal/Modal';
import { LootBoxReward } from '@/entities/LootBox';
import { useMemo } from 'react';
import { ViewsIcon } from '@/shared/ui/ViewsIcon/ViewsIcon';
import { Text } from '@/shared/ui/Text/Text';
import cls from './LootBoxRewardsListModal.module.scss';
import { formatNumber } from '@/shared/lib/utils/formatNumber';


interface LootBoxRewardsListModalProps {
    className?: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    rewards: LootBoxReward[]
}

export const LootBoxRewardsListModal: React.FC<LootBoxRewardsListModalProps> = (props) => {
    const { className, isOpen, setIsOpen, rewards: rewardsData } = props;

    const rewards = useMemo(() => {
        return rewardsData.reduce<Record<string, LootBoxReward[]>>((acc, cur) => {
            const { type } = cur
            if (!acc[type]) {
                acc[type] = []

            } 
            acc[type].push(cur)
            return acc
        }, {})
    }, [])

    return (
        <Modal isOpen={isOpen} className={clsx(cls.lootBoxRewardsListModal, {}, [className])} onClose={() => setIsOpen(false)}>
            {
                Object.keys(rewards).map((key) => (
                    <div key={key} className={cls.block}>
                        <Text className={cls.title} caps>{key}</Text>
                        {
                            <ul className={cls.rewardsList}>
                                {rewards[key].map((reward) => (
                                    <li className={cls.rewardItem} key={reward.id}>
                                        {
                                            key === 'points'
                                            ? <Text className={cls.text}>{formatNumber(reward.settings?.amount?.toString() ?? '0')} <ViewsIcon className={cls.icon} /></Text>
                                            : <Text className={cls.text}>{reward.title}</Text>
                                        }
                                    </li>
                                ))}
                            </ul>
                        }
                    </div>
                ))
            }
        </Modal>
    );
}