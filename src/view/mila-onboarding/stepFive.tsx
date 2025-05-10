import * as _ from "lodash";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {RiCheckboxCircleFill} from "react-icons/ri";
import {Button, Divider, Input, message} from "antd";

import {storage} from "../../utils/storage.ts";
import {copyToClipboard} from "../../components/copy-text.ts";
import {integrationList} from "../../components/integrationList.ts";
import {postSaveTelegramBot, updateAppState} from "../../store/actions";
import OnboardingFooterButton from "../../components/OnboardingFooterButton.tsx";
import {BOT_TOKEN, INTEGRATIONS_KEY, RESPONSE_BOT_TOKEN, UUID} from "../../config/constants.ts";
import {useAppSelector} from "../../utils/useAppSelector.ts";


const StepFive = () => {
    const {saveLoading} = useAppSelector("saveTelegramBot");
    const [selectIntegration, setSelectIntegration] = useState<number[]>([]);
    const [token, setToken] = useState("");
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (storage.has(INTEGRATIONS_KEY)) {
            setSelectIntegration(storage.get(INTEGRATIONS_KEY) as []);
        }
        if (storage.has(BOT_TOKEN)) {
            setToken(storage.get(BOT_TOKEN) as string);
        }
    }, [])

    const checkSelected = (id: number) => _.includes(selectIntegration, id);
    const onSelectCard = (id: number, active: boolean) => {
        if (active) {
            setSelectIntegration(p => {
                let n = [...p];
                if (_.includes(n, id)) {
                    n = n.filter((i) => i !== id);
                } else {
                    n = [...p, id];
                }
                storage.set(INTEGRATIONS_KEY, n);
                return n;
            });
        }
    };



    const handleCopy =  () => {
        copyToClipboard('<script src="https://ai-agent-chat.com/widget.js"></script> <script> window.AIChatWidget.init({ apiKey: \'your-api-key-here\', theme: \'light\', position: \'bottom-right\' }); </script>').then(() => {
            messageApi.success('Code copied').then();
        });
    }

    const saveBotToken = () => {
        dispatch(updateAppState("saveTelegramBot", {saveLoading: true}));
        dispatch(postSaveTelegramBot({data: {uuid: storage.get(UUID), telegram_bot_token: token}}));
        storage.set(BOT_TOKEN, token);
    };

    return (
        <>
            {contextHolder}
            <div>
                <div className="mb-8">
                    <h1 className="text-[24px] font-semibold">Add integrations</h1>
                    <p className="text-[#4B5563] text-[16px]">Select messaging channels to connect with your AI Agent</p>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {integrationList.map((i, index) => (
                        <div
                            key={index}
                            onClick={() => onSelectCard(i.id, i.active)}
                            className={`flex flex-col items-center p-6 border rounded-lg border-[#EFF1F3] cursor-pointer ${checkSelected(i.id) ? "bg-blue-50" : i.active ? "opacity-100" : "opacity-60 transition-opacity"}`}
                        >
                            <div className="mb-4">
                                <img src={i.icon} alt="#"/>
                            </div>
                            <div className="text-center">
                                <h3 className={`font-medium  ${checkSelected(i.id) ? "text-blue-700" : "text-gray-700"}`}>{i.title}</h3>
                                <p className={`text-sm ${checkSelected(i.id) ? "text-blue-600" : "text-gray-500"}`}>{i.description}</p>
                            </div>
                            { checkSelected(i.id) && (
                                <div className="mt-3">
                                    <RiCheckboxCircleFill className="text-blue-500 text-xl"/>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                { _.includes(selectIntegration, 1) && (
                    <div className="mt-8">
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Telegram Configuration</h3>
                        <p className="block text-sm font-medium text-gray-400 mb-2">Enter your Telegram Bot token</p>
                        <div className="flex gap-3">
                            <Input value={token} onChange={(e) => setToken(e.target.value)} size="large" className="w-full" placeholder="bot token"/>
                            <Button loading={saveLoading} onClick={saveBotToken} size="large" type="primary" className="w-[150px]">Save</Button>
                        </div>
                    </div>
                )}

                { _.includes(selectIntegration, 4) && (
                    <div className="mt-8">
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Website Chat Configuration</h3>
                        <p className="block text-sm font-medium text-gray-400 mb-2">Copy and paste this code snippet just before the closing {"</body>"} tag of your website:</p>
                        <div className="flex gap-3">
                            <div className="border border-gray-200 rounded-lg w-full text-red-500 p-4">
                                {"<script src=\"https://ai-agent-chat.com/widget.js\"></script> <script> window.AIChatWidget.init({ apiKey: 'your-api-key-here', theme: 'light', position: 'bottom-right' }); </script>"}

                                <div className="flex justify-end mt-2">
                                    <button onClick={handleCopy} className="bg-[#1677FF] px-5 cursor-pointer py-1 rounded-[4px] text-white"><i className="ri-file-copy-fill"/> Copy code</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Divider/>
            <OnboardingFooterButton prev={4} goNext={() => {
                if (storage.has(RESPONSE_BOT_TOKEN)) {
                    navigate('/check-documents');
                } else {
                    messageApi.warning("Please implement Agent integration.").then()
                }
            }}/>
        </>
    )
}


export default StepFive;