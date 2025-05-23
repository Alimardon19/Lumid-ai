import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {Col, Divider, Form, FormProps, Input, Row, Select} from "antd";

import {storage} from "../../utils/storage.ts";
import {updateAppState} from "../../store/actions";
import {useAppSelector} from "../../utils/useAppSelector.ts";
import {ONBOARDING, ONBOARDING_STEP} from "../../config/constants.ts";
import OnboardingFooterButton from "../../components/OnboardingFooterButton.tsx";


const StepOne = () => {
    const {data} = useAppSelector("onboardingStep");
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const localOnboarding = storage.get(ONBOARDING) ?? {};

    useEffect(() => {
        if (storage.has(ONBOARDING)) {
            form.setFieldsValue(localOnboarding);
        }
    }, []);

    const onFinish: FormProps['onFinish'] = (values) => {
        dispatch(updateAppState("onboardingStep", {data: {...data, ...values}, step: 2}));
        storage.set(ONBOARDING, {...localOnboarding, ...values});
        storage.set(ONBOARDING_STEP, 2)
    };

    return (
        <div>
            <div data-aos="zoom-in">
                <h1 className="text-[24px] font-semibold mb-8">Company Information</h1>

                <Form layout="vertical" onFinish={onFinish} form={form}>
                    <Form.Item name="company_name" label="Company Name" rules={[{required: true}]}>
                        <Input placeholder="Company Name" size="large"/>
                    </Form.Item>

                    <Form.Item name="industry" label="Industry" rules={[{required: true}]}>
                        <Select
                            size="large"
                            placeholder="Select industry"
                            options={[
                                {value: "IT Services", label: "IT Services"},
                                {value: "E-commerce", label: "E-commerce"},
                                {value: "Healthcare", label: "Healthcare"},
                                {value: "Finance", label: "Finance"},
                                {value: "Education", label: "Education"},
                                {value: "Marketing", label: "Marketing"},
                                {value: "Logistics", label: "Logistics"},
                                {value: "Real Estate", label: "Real Estate"},
                                {value: "Entertainment", label: "Entertainment"},
                                {value: "Automotive", label: "Automotive"},
                                {value: "Other", label: "Other"}
                            ]}
                        />
                    </Form.Item>

                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Form.Item name="company_email" label="Company Email" rules={[{type: "email"}]}>
                                <Input placeholder="Enter company email" size="large"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="company_website" label="Company Website (Comming soon)">
                                <Input
                                    size="large"
                                    placeholder="https://www.yourcompany.com"
                                    prefix={<i className="ri-global-line text-[#9CA3AF] mr-1"/>}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="instagram_account" label="Instagram Account (Comming soon)">
                                <Input
                                    size="large"
                                    placeholder="@youraccount"
                                    prefix={<i className="ri-instagram-line text-[#9CA3AF] mr-1"/>}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="telegram_channel" label="Telegram Channel (Comming soon)">
                                <Input
                                    size="large"
                                    placeholder="@youraccount"
                                    prefix={<i className="ri-telegram-fill text-[#9CA3AF] mr-1"/>}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>

            <Divider/>
            <OnboardingFooterButton prev={0} goNext={form.submit}/>
        </div>
    )
}


export default StepOne;