import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import {FaFileAlt} from "react-icons/fa";
import {IoMdCloudUpload} from "react-icons/io";
import {Col, Divider, Form, FormProps, notification, Row} from "antd";

import {storage} from "../../utils/storage.ts";
import {updateAppState} from "../../store/actions";
import service from "../../config/FetchInterceptor.ts";
import {useAppSelector} from "../../utils/useAppSelector.ts";
import {ONBOARDING, ONBOARDING_STEP, UUID} from "../../config/constants.ts";
import OnboardingFooterButton from "../../components/OnboardingFooterButton.tsx";


const StepFour = () => {
    const {data} = useAppSelector("onboardingStep");
    const {saveLoading} = useAppSelector("companyInfo");
    const [loadingIndex, setLoadingIndex] = useState([false, false]);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const localOnboarding = storage.get(ONBOARDING) ?? {};
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        if (storage.has(ONBOARDING)) {
            form.setFieldsValue(localOnboarding);
        }
    }, []);

    const openNotification = (message: string, type: "success" | "error") => {
        api[type]({message, placement: "top"});
    };

    const updateLoadingIndex = (index: number, condition: boolean) => {
        setLoadingIndex(prev => {
            const updated = [...prev];
            updated[index] = condition;
            return updated;
        });
    };

    const onChangeCompanyInfo = (event: React.ChangeEvent<HTMLInputElement>, type: string, index: number) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const selectedFile: File = files[0];
            const f = new FormData();
            f.append("data", selectedFile);
            f.append("uuid", storage.get(UUID) as string);
            f.append("content_type", type);
            updateLoadingIndex(index, true);
            service.post("/mila/saveDocument", f).then(() => {
                openNotification("Document successfuly readed!", "success");
            }).catch(() => {
                openNotification("Error while saving document", "error");
            }).finally(() => updateLoadingIndex(index, false))
        }
    };

    const onFinish: FormProps['onFinish'] = (values) => {
        dispatch(updateAppState("onboardingStep", {data: {...data, ...values}, step: 5}));
        storage.set(ONBOARDING, {...localOnboarding, ...values});
        storage.set(ONBOARDING_STEP, 5);
    };

    const loaderSpin = (
        <div className="px-[12px] py-[8px] rounded-[8px] mt-4 flex justify-center gap-1">
            <div className="animate-spin"><i className="ri-loader-line"/></div>
             Uploading...
        </div>
    );


    return (
        <div>
            {contextHolder}
            <div data-aos="zoom-in">
                <h1 className="text-[24px] font-semibold mb-8">Company Information</h1>

                <Form layout="vertical" onFinish={onFinish} form={form}>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <h2 className="font-semibold text-[#374151] mb-2">Company Information</h2>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center mb-4">
                                <div className="flex justify-center">
                                    <IoMdCloudUpload className="text-[#9CA3AF] text-[30px]"/>
                                </div>
                                <p className="mt-2 text-sm text-gray-600">Drag and drop your company information file</p>
                                <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (Max 10MB)</p>
                                <div className="flex justify-center">
                                    <div className="flex justify-center">
                                        {loadingIndex[0] ? loaderSpin :
                                            <label htmlFor="company_input" className="bg-[#F3F4F6] px-[12px] py-[8px] rounded-[8px] mt-4 cursor-pointer">
                                                Select file
                                            </label>
                                        }
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <h2 className="font-semibold text-[#374151] mb-2">Frequently Asked Questions (FAQ)</h2>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center mb-4">
                                <div className="flex justify-center">
                                    <FaFileAlt className="text-[#9CA3AF] text-[30px]"/>
                                </div>
                                <p className="mt-2 text-sm text-gray-600">Upload your FAQ document</p>
                                <p className="text-xs text-gray-500 mt-1">Help AI agent learn about your business</p>
                                <div className="flex justify-center">
                                    <div className="flex justify-center">
                                        { loadingIndex[1] ? loaderSpin :
                                            <label htmlFor="faq_input" className="bg-[#F3F4F6] px-[12px] py-[8px] rounded-[8px] mt-4 cursor-pointer">
                                                Select file
                                            </label>
                                        }
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>

            <Divider/>
            <OnboardingFooterButton prev={3} goNext={form.submit} loading={saveLoading}/>

            <input type="file" onChange={(e) => onChangeCompanyInfo(e, "Company Info", 0)} style={{display: 'none'}} id="company_input"/>
            <input type="file" onChange={(e) => onChangeCompanyInfo(e, "Frequently Asked Questions", 1)} style={{display: 'none'}} id="faq_input"/>
        </div>
    )
}


export default StepFour;