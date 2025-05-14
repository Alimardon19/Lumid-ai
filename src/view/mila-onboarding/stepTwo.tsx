import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Button, Divider, Form, FormProps, Input, Select} from "antd";
import { FaWrench } from "react-icons/fa";

import {storage} from "../../utils/storage.ts";
import {updateAppState} from "../../store/actions";
import {useAppSelector} from "../../utils/useAppSelector.ts";
import {ONBOARDING, ONBOARDING_STEP} from "../../config/constants.ts";
import OnboardingFooterButton from "../../components/OnboardingFooterButton.tsx";


const StepTwo = () => {
    const {data} = useAppSelector("onboardingStep");
    const s_arr = ["Sell", "Consult", "Technical support", "Other"];
    const [specialization, setSpecialization] = useState("");
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const localOnboarding: any = storage.get(ONBOARDING) ?? {};


    useEffect(() => {
        if (storage.has(ONBOARDING)) {
            form.setFieldsValue(localOnboarding);
            setSpecialization(localOnboarding?.specialization);
        }
    }, []);

    const onFinish: FormProps['onFinish'] = (values) => {
        dispatch(updateAppState("onboardingStep", {data: {...data, ...values}, step: 3}));
        storage.set(ONBOARDING, {...localOnboarding, ...values, specialization});
        storage.set(ONBOARDING_STEP, 3);
    };
    
    const checkBtnVariant = (type: string) => {
        return specialization === type ? 'solid' : 'filled';
    };


    return (
        <div>
            <div data-aos="zoom-in">
                <h1 className="text-[24px] font-semibold mb-8">Mila's Communication Style with your clients</h1>

                <Form layout="vertical" onFinish={onFinish} form={form}>
                    <Form.Item name="agent_name" label="AI Agent Name" rules={[{required: true}]} help="This is the name your customers will interact with">
                        <Input
                            size="large"
                            placeholder="Mila"
                            prefix={<i className="ri-robot-2-fill text-[#9CA3AF] mr-1"/>}
                        />
                    </Form.Item>
                    <br/>
                    <Form.Item name="communication_style" label="In what style should Mila communicate?">
                        <Select
                            size="large"
                            placeholder="Select communication style"
                            options={[
                                {
                                    value: "Friendly (on a first name basis)",
                                    label: "Friendly (on a first name basis)"
                                },
                                {
                                    value: "Formal (formal)",
                                    label: "Formal (formal)"
                                },
                                {
                                    value: "Adaptive (communicate in the style in which the client addressed)",
                                    label: "Adaptive (communicate in the style in which the client addressed)"
                                }
                            ]}
                        />
                    </Form.Item>
                    <Form.Item name="response_style" label="If Mila does not know the answer she will direct it to your manager, at this time what should Mila say to coutomer:" rules={[{required: true}]}>
                        <Select
                            size="large"
                            placeholder="Select response style"
                            options={[
                                {
                                    value: "Please hold on a moment — our manager will get back to you shortly regarding this question",
                                    label: "Please hold on a moment — our manager will get back to you shortly regarding this question"
                                },
                                {
                                    value: "I’ve forwarded this question to our manager, and they will respond to you as soon as possible.",
                                    label: "I’ve forwarded this question to our manager, and they will respond to you as soon as possible."
                                },
                                {
                                    value: "Your question requires additional assistance, so I’ve passed it along to our manager.",
                                    label: "Your question requires additional assistance, so I’ve passed it along to our manager."
                                },
                                {
                                    value: "I’ll clarify this question and get back to you shortly.",
                                    label: "I’ll clarify this question and get back to you shortly."
                                },
                                {
                                    value: "I need to confirm some details on this — thank you for your patience, you’ll receive an update soon.",
                                    label: "I need to confirm some details on this — thank you for your patience, you’ll receive an update soon."
                                }
                            ]}
                        />
                    </Form.Item>
                    <Form.Item label="What should Mila do:">
                        <div className="flex gap-4 mb-[1rem]">
                            <Button onClick={() => setSpecialization(s_arr[0])} color="primary" variant={checkBtnVariant(s_arr[0])} className="w-[50%]" size="large">
                                <i className="ri-shopping-cart-2-fill"/> {s_arr[0]}
                            </Button>
                            <Button onClick={() => setSpecialization(s_arr[1])} color="primary" variant={checkBtnVariant(s_arr[1])} className="w-[50%]" size="large">
                                <i className="ri-question-answer-fill"/> {s_arr[1]}
                            </Button>
                        </div>
                        <div className="flex gap-4">
                            <Button onClick={() => setSpecialization(s_arr[2])} color="primary" variant={checkBtnVariant(s_arr[2])} className="w-[50%]" size="large">
                                <FaWrench className="mt-[4px]"/> {s_arr[2]}
                            </Button>
                            <Button onClick={() => setSpecialization(s_arr[3])} color="primary" variant={checkBtnVariant(s_arr[3])} className="w-[50%]" size="large">
                                <i className="ri-add-large-line"/> {s_arr[3]}
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
            <Divider/>
            <OnboardingFooterButton prev={1} goNext={form.submit}/>
        </div>
    )
}


export default StepTwo;