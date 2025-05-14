import {Divider} from "antd";
import {values} from "lodash";
import {TbEdit} from "react-icons/tb";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {RiDeleteBinLine} from "react-icons/ri";

import {storage} from "../../utils/storage.ts";
import {useAppSelector} from "../../utils/useAppSelector.ts";
import {postCompanyInfo, updateAppState} from "../../store/actions";
import {ONBOARDING, ONBOARDING_STEP} from "../../config/constants.ts";
import OnboardingFooterButton from "../../components/OnboardingFooterButton.tsx";


const schema = [
    {step: 1, text: "Say hello and ask how you can help the client."},
    {step: 2, text: "Clarify the details of the client's problem."},
    {step: 3, text: "Find the answer to the client's question, clarify additional information if necessary."},
    {step: 4, text: "Make sure the client's problem is solved. Ask to rate the support level from 1 to 10."}
]

const StepThree = () => {
    const {data} = useAppSelector("onboardingStep");

    const [_editIndex, setEditIndex] = useState<{index: number, text: string} | undefined>();
    const [dialogSchema, setDialogSchema] = useState<{step: number, text: string}[]>(schema);
    const localOnboarding: any = storage.get(ONBOARDING) ?? {};
    const dispatch = useDispatch();

    useEffect(() => {
        if (storage.has(ONBOARDING)) {
            setDialogSchema(localOnboarding?.dialog_schema?.length ? localOnboarding.dialog_schema : schema);
        }
    }, []);

    const startEdit = (index: number, text: string) => {
        setEditIndex({index, text});
    };

    const onFinish = () => {
        dispatch(updateAppState("onboardingStep", {data: {...data, ...values}, step: 4}));
        storage.set(ONBOARDING, {...localOnboarding, ...values, dialog_schema: dialogSchema});
        storage.set(ONBOARDING_STEP, 4);

        dispatch(updateAppState("companyInfo", {saveLoading: true}));
        dispatch(postCompanyInfo({data: {...localOnboarding, ...values}}));
    };


    return (
        <div>
            <div data-aos="zoom-in">
                <h1 className="text-[24px] font-semibold mb-8">How should the assistant develop the dialogue?</h1>
                <div className="bg-[#FFFBEB] mb-10 rounded-sm border-l-4 border-[#F59E0B] text-[#B45309] p-4" role="alert">
                    <p>See the example below. This is not a clear script, but a rough outline of the ideal dialogue that the AI assistant will try to.</p>
                </div>

                { dialogSchema.map((elm, index) => (
                    <div key={index} className="flex gap-4 justify-between rounded-[8px] border border-[#E5E7EB] p-[17px] mb-[16px]">
                        <div className="flex gap-1">
                            {elm.step}.
                            <div>{elm.text}</div>
                        </div>
                        <div className="flex gap-3">
                            <TbEdit size="20" color="#6B7280" className="cursor-pointer" onClick={() => startEdit(index, elm.text)}/>
                            <RiDeleteBinLine size="20" color="#6B7280" className="cursor-pointer"/>
                        </div>
                    </div>
                ))}
                <div className="text-center">
                    <button className="border border-[#D1D5DB] text-[14px] rounded-[8px] py-[10px] px-[20px] hover:bg-gray-100 cursor-pointer">
                        <i className="ri-add-line"/> Add Steps
                    </button>
                </div>
            </div>
            <Divider/>
            <OnboardingFooterButton prev={2} goNext={onFinish}/>
        </div>
    )
}


export default StepThree;