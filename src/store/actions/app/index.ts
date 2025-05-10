import * as types from '../../constants/app/index.ts';
import {callAction, callUpdateAppStateReducer} from "../../../utils/custom-action.ts";

/** Actions for the backend */

/** Update Action app state */
export const updateAppState = callUpdateAppStateReducer(types.UPDATE_APP_STATE);

// company info
export const postCompanyInfo = callAction("POST_COMPANY_INFO");
export const postSaveTelegramBot = callAction("POST_SAVE_TELEGRAM_BOT");