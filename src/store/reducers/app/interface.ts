interface intlData {
    data: any;
    openModal: boolean;
    saveLoading: boolean;
    editData: any;
    tableLoading: boolean;
    searchLoading: boolean;
}


/** App state*/
export interface IAppState {
    [key: string]: any;

    companyInfo: intlData;
    saveTelegramBot: intlData;

    // onboarding
    onboardingStep: {
        step: number;
        data: any
    }
}
