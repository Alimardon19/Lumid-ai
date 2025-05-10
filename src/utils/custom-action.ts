import {createAction} from "@reduxjs/toolkit";
import {IAction} from "../store/store-interface.ts";
import {RootState} from "../store/root-reducer.ts";

export const callAction = (type: string) => {
    return createAction<IAction | undefined>(type)
}

export const callUpdateAppStateReducer = (type: string) => {
    return function <T extends keyof RootState['app']>(reducer: T, payload: any) {
        return {
            type: type,
            payload: {
                key: reducer,
                state: payload,
            }
        }
    }
}