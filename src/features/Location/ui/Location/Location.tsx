import clsx from 'clsx';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getLevels, getLevelsIsInit, getLevelsIsLoading, LevelImages } from '@/entities/Level';
import { useSelector } from 'react-redux';
import { LevelInfo } from '../LevelInfo/LevelInfo';

import { LocationLoader } from '../LocationLoader/LocationLoader';
import { useEffect } from 'react';
import { locationActions, locationReducer } from '../../model/slice/locationSlice';
import cls from './Location.module.scss';
import { getLocationCurLocation, getLocationIsInit } from '../../model/selectors/getLocation';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserCurrentLevel } from '@/entities/User';


interface LocationProps {
    className?: string;
}

const reducers: ReducersList = {
    location: locationReducer
}



export const Location: React.FC<LocationProps> = (props) => {
    const { className } = props;
    const levelsIsLoading = useSelector(getLevelsIsLoading)
    const levelsIsInit = useSelector(getLevelsIsInit)
    const isInit = useSelector(getLocationIsInit)
    const dispatch = useAppDispatch()
    const levels = useSelector(getLevels)
    const curLocation = useSelector(getLocationCurLocation)
    const userLocation = useSelector(getUserCurrentLevel)


    useEffect(() => {
        if (!isInit && levelsIsInit ) {
            dispatch(locationActions.initLocation(levels))
        }
    }, [isInit, levelsIsInit])

    return (
        <DynamicModuleLoader reducers={reducers}>
            {
                levelsIsLoading 
                ? <LocationLoader />
                : <div className={clsx(cls.location, {}, [className])}>
                    <LevelInfo />
                    <img src={LevelImages[curLocation?.level ?? 1]} className={clsx(cls.locationImage, {
                        [cls.notAvailable]: (userLocation?.level ?? 1) < (curLocation?.level ?? 1)
                    })} />
                  </div>
            }
            
        </DynamicModuleLoader>
    );
}