import {all} from 'redux-saga/effects';


// app
import company_info from "./sagas/app/company-info.ts"

// export root sagas from "store"
export default function* rootSaga() {
    yield all([
        company_info()
    ])
}