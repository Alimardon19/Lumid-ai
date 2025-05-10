import {IAppState} from "./interface.ts";


const intlData = {
    data: {},
    openModal: false,
    saveLoading: false,
    tableLoading: false,
    editData: {},
    searchLoading: false,
}

export const initialState: IAppState = {
    // dashboard config
    companyInfo: intlData,
    saveTelegramBot: intlData,

    // onboarding
    onboardingStep: {
        step: 1,
        data: {}
    }
};