import * as _ from "lodash";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {ConfigProvider, Progress} from "antd";

import StepOne from "./stepOne.tsx";
import StepTwo from "./stepTwo.tsx";
import StepFour from "./stepFour.tsx";
import StepFive from "./stepFive.tsx";
import StepThree from "./stepThree.tsx";
import {storage} from "../../utils/storage.ts";
import {updateAppState} from "../../store/actions";
import {ONBOARDING_STEP} from "../../config/constants.ts";
import {useAppSelector} from "../../utils/useAppSelector.ts";
import {onboarding_input} from "../../theme/update_theme.ts";


const MilaOnboarding = () => {
    const {step} = useAppSelector("onboardingStep");
    const dispatch = useDispatch();

    useEffect(() => {
        if (storage.has(ONBOARDING_STEP)) {
            dispatch(updateAppState("onboardingStep", {step: storage.get(ONBOARDING_STEP)}));
        }

        return () => {
            dispatch(updateAppState("onboardingStep", {step: 1}));
        }
    }, []);

    const stepsMap = {
        1: <StepOne/>,
        2: <StepTwo/>,
        3: <StepThree/>,
        4: <StepFour/>,
        5: <StepFive/>,
    };


    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-12 text-center">
                        <div className="text-2xl mb-5 text-[20px] font-[500] text-[#1F2937]">Step {step} of 5</div>
                        <Progress
                            size={["100%", 15]}
                            percent={(100 / 5) * step}
                            showInfo={false}
                            status="active"
                            strokeColor={"#1677FF"}
                        />
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                        <ConfigProvider theme={onboarding_input}>
                            {_.get(stepsMap, step, null)}
                        </ConfigProvider>
                    </div>
                </div>
            </div>
        </>
    )
}


export default MilaOnboarding;