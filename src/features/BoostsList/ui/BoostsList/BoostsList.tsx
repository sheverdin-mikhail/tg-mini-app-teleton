import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { getUserBoosts } from '@/entities/User';
import { Title } from '@telegram-apps/telegram-ui';
import cls from './BoostsList.module.scss';
import { useGetBoostsList } from '@/entities/Boost';
import { BoostsListItem } from '../BoostsListItem/BoostsListItem';
import { BoostsListLoading } from '../BoostsListLoading/BoostsListLoading';

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
      <Title weight="1" caps className={cls.title}>
        Boosts
      </Title>
      {
        isLoading
          ? <BoostsListLoading />
          : (
            <div className={clsx(cls.boosts, {}, [className])}>
              {
                boosts?.map((boost) => (
                  <BoostsListItem item={boost} key={boost.id} alreadyHave={!!userBoosts?.find((userBoost) => userBoost.id === boost.id)} />
                ))
              }
            </div>
          )
      }
      {
        isError && (
          <span>
            Не удалось загрузить список бустов
          </span>
        )
      }

    </div>
  );
};
