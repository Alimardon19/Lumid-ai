import {useSelector} from 'react-redux';
import {RootState} from "../store/root-reducer.ts";

/*****************************************************************************************
 *                                                                                       *
 *  Custom hook that accepts a key as a string and returns the corresponding state slice *
 *                                                                                       *
 ****************************************************************************************/

export const useAppSelector = <T extends keyof RootState['app']>(key: T) => {
    return useSelector((state: RootState) => state.app[key]);
};