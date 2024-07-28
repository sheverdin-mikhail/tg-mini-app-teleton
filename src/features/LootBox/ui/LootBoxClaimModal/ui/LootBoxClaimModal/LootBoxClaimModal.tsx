import clsx from 'clsx';
import cls from './LootBoxClaimModal.module.scss';
import { Modal } from '@/shared/ui/Modal/Modal';
import { useSelector } from 'react-redux';
import { getLootBoxIsOpen, getLootBoxItems } from '../../../../model/selectors/lootBoxSelectors';
import { useCallback } from 'react';
import { LootBoxReward } from '@/entities/LootBox';
import { LootBoxClaimModalBoostContent } from '../LootBoxClaimModalBoostContent/LootBoxClaimModalBoostContent';
import { LootBoxClaimModalEmptyContent } from '../LootBoxClaimModalEmptyContent/LootBoxClaimModalEmptyContent';
import { Boost } from '@/entities/Boost';
import { LootBoxClaimModalPointsContent } from '../LootBoxClaimModalPointsContent/LootBoxClaimModalPointsContent';

interface LootBoxClaimModalProps {
  className?: string;
}
//TODO: Сделать корректное отображение и логику при покупке нескольких лутбоксов
export const LootBoxClaimModal: React.FC<LootBoxClaimModalProps> = (props) => {
  const { className } = props;
  const isOpen = useSelector(getLootBoxIsOpen)
  const rewards = useSelector(getLootBoxItems)

  const getModalContent = useCallback((reward: LootBoxReward) => {
    switch(reward.type) {
      case 'boost':
        return <LootBoxClaimModalBoostContent key={reward.id} boost={reward.value as Boost} /> 
      case 'points':
        return <LootBoxClaimModalPointsContent key={reward.id} points={reward.value as number}/> 
      case 'empty':
        return <LootBoxClaimModalEmptyContent key={reward.id} /> 
      default:
        return <LootBoxClaimModalEmptyContent key={reward.id} /> 
    }
  }, [])

  return (
    <Modal className={clsx(cls.lootBoxClaimModal, {}, [className])} isOpen={isOpen}>
      {
        rewards?.map((reward) => (
          getModalContent(reward)
        ))
      }
    </Modal>
  );
}