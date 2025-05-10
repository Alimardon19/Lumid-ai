import {IAppState} from "./interface.ts";
import {initialState} from "./initialState.ts";
import {UPDATE_APP_STATE} from "../../constants/app";
import {IActionUpdateState} from "../../store-interface.ts";


const reducer = (state = initialState, action: IActionUpdateState): IAppState => {
    switch (action.type) {
        case UPDATE_APP_STATE: {
            return {
                ...state,
                [action.payload.key]: {
                    // Provide a fallback empty object if the key doesn't exist
                    ...state[action.payload.key],
                    ...action.payload.state
                }
            };
        }
        default: return state;
    }
};

export default reducer;
