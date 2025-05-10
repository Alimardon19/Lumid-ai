import {all, call, takeEvery, fork, put} from 'redux-saga/effects';
import {IPayload} from "../../store-interface.ts";
import service from '../../../config/FetchInterceptor';
import {postCompanyInfo, postSaveTelegramBot, updateAppState} from '../../actions';
import {storage} from "../../../utils/storage.ts";
import {ONBOARDING_STEP, RESPONSE_BOT_TOKEN, UUID} from "../../../config/constants.ts";
import {showMessage} from "../../../utils/messageUtils.ts";



function* callPostCompanyInfo() {
    yield takeEvery(postCompanyInfo.type, function* (action: IPayload) {
        try {
            const data: any = yield call<any>(service, {
                method: 'post',
                url: `/mila/createAssistant`,
                data: action.payload?.data
            });
            if (data["uuid"]) {
                storage.set(UUID, data["uuid"]);
            }
            yield put(updateAppState("onboardingStep", {step: 5}));
            storage.set(ONBOARDING_STEP, 5);
        } catch (error) {
            console.log(error);
        } finally {
            yield put(updateAppState("companyInfo", {saveLoading: false}));
        }
    })
}

function* callPostTelegramBot() {
    yield takeEvery(postSaveTelegramBot.type, function* (action: IPayload) {
        try {
            const data: any = yield call<any>(service, {
                method: 'post',
                url: `/mila/registerTelegramBot`,
                data: action.payload?.data
            });
            if (data["uuid"]) {
                showMessage.success("Successful connection to the agent bot").then();
                storage.set(RESPONSE_BOT_TOKEN, data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            yield put(updateAppState("saveTelegramBot", {saveLoading: false}));
        }
    })
}


export default function* rootSaga() {
    yield all([
        fork(callPostCompanyInfo),
        fork(callPostTelegramBot)
    ]);
}