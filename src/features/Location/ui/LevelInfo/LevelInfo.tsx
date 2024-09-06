import clsx from 'clsx';
import cls from './LevelInfo.module.scss';
import { FontSize, FontWeight, Text, TextColor } from '@/shared/ui/Text/Text';
import { PointsBadge } from '@/shared/ui/PointsBadge/PointsBadge';
import ArrowIcon from '@/shared/assets/icons/long-arrow-right.svg';
import { Icon } from '@/shared/ui/Icon/Icon';
import { useSelector } from 'react-redux';
import { getLevels } from '@/entities/Level';
import { getLocationCurLocation } from '../../model/selectors/getLocation';
import { getUserCurrentLevel, getUserTotalPoins } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { locationActions } from '../../model/slice/locationSlice';
import { CircleProgress } from '@/shared/ui/CircleProgress/CircleProgress';
import { formatNumber } from '@/shared/lib/utils/formatNumber';
import { useMemo } from 'react';


interface LevelInfoProps {
    className?: string;
}

export const LevelInfo: React.FC<LevelInfoProps> = (props) => {
    const { className } = props;
    const levels = useSelector(getLevels)
    const curLocation = useSelector(getLocationCurLocation)
    const userLocation = useSelector(getUserCurrentLevel)
    const totalPoints = useSelector(getUserTotalPoins)
    const dispatch = useAppDispatch()

    const progress = useMemo(() => {
        let pointsPercents = totalPoints / (curLocation?.pointToNextLevel || 1) * 100;
        if (pointsPercents > 100) {
          pointsPercents = 100;
        }
    
        const totalPercents = pointsPercents;
        return totalPercents;
      }, [curLocation, levels]);

    return (
        <div className={clsx(cls.levelInfo, [className])}>
            <CircleProgress disabled={(userLocation?.level ?? 1) < (curLocation?.level ?? 1)} width={45} curPercent={(userLocation?.level ?? 1) > (curLocation?.level ?? 1) ? 100 : progress} >{curLocation?.level}/{levels.length}</CircleProgress>
            <div className={cls.block}>
                <Text size={FontSize.LG} weight={FontWeight.BOLD}>{curLocation?.name}</Text>
                <Text size={FontSize.SM} weight={FontWeight.MEDIUM} color={TextColor.SECONDARY}>
                    {
                        (curLocation?.level ?? 1) < (userLocation?.level ?? 1)
                        ? 'passed'
                        : (curLocation?.level ?? 1) > (userLocation?.level ?? 1)
                            ? 'Not available'
                            : 'Current location'
                    }
                </Text>
            </div>
            <Text size={FontSize.SM}>{curLocation?.description}</Text>
            <PointsBadge className={cls.badge} disabled={(userLocation?.level ?? 1) < (curLocation?.level ?? 1)}>
            {
                (curLocation?.level ?? 1) < (userLocation?.level ?? 1)
                ? <Text size={FontSize.LG} weight={FontWeight.MEDIUM}>{formatNumber(curLocation?.pointToNextLevel.toString() ?? '0')}</Text>
                : (curLocation?.level ?? 1) > (userLocation?.level ?? 1)
                    ? <Text size={FontSize.LG} weight={FontWeight.MEDIUM}>&nbsp;from {formatNumber(curLocation?.pointToNextLevel.toString() ?? '0')}</Text> 
                    : <>
                       <Text size={FontSize.LG} weight={FontWeight.MEDIUM}>{formatNumber(totalPoints.toString() ?? '0')}</Text>
                       <Text size={FontSize.LG} weight={FontWeight.MEDIUM} color={TextColor.SECONDARY}>&nbsp;/&nbsp;{formatNumber(curLocation?.pointToNextLevel.toString() ?? '0')}</Text>
                      </>
            }
            </PointsBadge>

            <div className={cls.navigation}>
                <Icon disabled={(curLocation?.level ?? 1) <= 1 } clickable onClick={() => dispatch(locationActions.prevLocation())} Svg={ArrowIcon} className={clsx(cls.prevButton, {
                    [cls.disabled]: (curLocation?.level ?? 1) <= 1 
                })} />
                <Icon disabled={(curLocation?.level ?? 1) >= levels.length} clickable onClick={() => dispatch(locationActions.nextLocation())} Svg={ArrowIcon} className={clsx(cls.nextButton, {
                    [cls.disabled]: (curLocation?.level ?? 1) >= levels.length
                })} />
            </div>
        </div>
    );
}