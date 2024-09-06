import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { getUserBoosts } from '@/entities/User';
import cls from './BoostsList.module.scss';
import { useGetBoostsList } from '@/entities/Boost';
import { BoostsListItem } from '../BoostsListItem/BoostsListItem';
import { BoostsListLoading } from '../BoostsListLoading/BoostsListLoading';
import { FontSize, Text, TextColor } from '@/shared/ui/Text/Text';

interface BoostsListProps {
    className?: string;
}

export const BoostsList: React.FC<BoostsListProps> = (props) => {
  const { className } = props;
  const {
    data: boosts, isLoading, isError,
  } = useGetBoostsList();
  const userBoosts = useSelector(getUserBoosts);

  return (
    <div className={cls.boostsList}>
      <Text color={TextColor.SECONDARY} size={FontSize.LG}>
        Boosts
      </Text>
      {
        isLoading
          ? <BoostsListLoading />
          : (
            <div className={clsx(cls.boosts, {}, [className])}>
              {
                boosts?.map((boost) => (
                  <BoostsListItem item={boost} key={boost.id} alreadyHave={!!userBoosts?.find((userBoost) => userBoost.id === boost.id)?.user_boost.isPurchased} />
                ))
              }
            </div>
          )
      }
      {
        isError && (
          <Text>
            Error! Can't load Boosts list, check your connection.
          </Text>
        )
      }

    </div>
  );
};
