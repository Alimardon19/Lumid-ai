import React from 'react';
import {useNavigate} from "react-router-dom";
import {
    RiCheckboxCircleFill,
    RiCloseLine,
    RiInstagramLine,
    RiMessage2Line,
    RiMessengerLine,
    RiPuzzleLine,
    RiTelegramLine,
    RiWhatsappLine
} from 'react-icons/ri';


const Integrations: React.FC = () => {
    const navigate = useNavigate();


    return (
        <div className="min-h-screen w-full bg-black/50 flex items-center justify-center">
            {/* Modal */}
            <div className="bg-white rounded-2xl shadow-2xl w-[800px] p-8 relative" data-aos="zoom-in">
                {/* Close button */}
                <button className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
                    <RiCloseLine className="text-xl" onClick={history.back}/>
                </button>

                {/* Modal Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Add integrations</h2>
                    <p className="text-gray-600 mt-2">Select messaging channels to connect with your AI Agent</p>
                </div>

                {/* Integration Options */}
                <div className="grid grid-cols-3 gap-6">
                    {/* Telegram (Active) */}
                    <div className="flex flex-col items-center p-6 border rounded-lg bg-blue-50 border-blue-200">
                        <div className="mb-4">
                            <RiTelegramLine className="text-7xl text-blue-500"/>
                        </div>
                        <div className="text-center">
                            <h3 className="font-medium text-blue-700">Telegram</h3>
                            <p className="text-sm text-blue-600">Connect your Telegram bot</p>
                        </div>
                        <div className="mt-3">
                            <RiCheckboxCircleFill className="text-blue-500 text-xl"/>
                        </div>
                    </div>

                    {/* Instagram */}
                    <div
                        className="flex flex-col items-center p-6 border rounded-lg opacity-60 hover:opacity-100 transition-opacity">
                        <div className="mb-4">
                            <RiInstagramLine className="text-7xl text-pink-500"/>
                        </div>
                        <div className="text-center">
                            <h3 className="font-medium text-gray-700">Instagram</h3>
                            <p className="text-sm text-gray-500">Connect Instagram messages</p>
                        </div>
                    </div>

                    {/* Facebook Messenger */}
                    <div
                        className="flex flex-col items-center p-6 border rounded-lg opacity-60 hover:opacity-100 transition-opacity">
                        <div className="mb-4">
                            <RiMessengerLine className="text-7xl text-blue-600"/>
                        </div>
                        <div className="text-center">
                            <h3 className="font-medium text-gray-700">Facebook Messenger</h3>
                            <p className="text-sm text-gray-500">Connect Messenger chat</p>
                        </div>
                    </div>

                    {/* Website Chat */}
                    <div
                        className="flex flex-col items-center p-6 border rounded-lg opacity-60 hover:opacity-100 transition-opacity">
                        <div className="mb-4">
                            <RiMessage2Line className="text-7xl text-purple-500"/>
                        </div>
                        <div className="text-center">
                            <h3 className="font-medium text-gray-700">Website Chat</h3>
                            <p className="text-sm text-gray-500">Embed chat on your website</p>
                        </div>
                    </div>

                    {/* WhatsApp */}
                    <div
                        className="flex flex-col items-center p-6 border rounded-lg opacity-60 hover:opacity-100 transition-opacity">
                        <div className="mb-4">
                            <RiWhatsappLine className="text-7xl text-green-500"/>
                        </div>
                        <div className="text-center">
                            <h3 className="font-medium text-gray-700">WhatsApp</h3>
                            <p className="text-sm text-gray-500">Connect WhatsApp Business</p>
                        </div>
                    </div>

                    {/* Other CRMs */}
                    <div
                        className="flex flex-col items-center p-6 border rounded-lg opacity-60 hover:opacity-100 transition-opacity">
                        <div className="mb-4">
                            <RiPuzzleLine className="text-7xl text-orange-500"/>
                        </div>
                        <div className="text-center">
                            <h3 className="font-medium text-gray-700">Other Chat-CRMs</h3>
                            <p className="text-sm text-gray-500">Connect additional CRM platforms</p>
                        </div>
                    </div>
                </div>

                {/* Telegram Configuration Section */}
                <div className="mt-8 border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Telegram Configuration</h3>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label htmlFor="telegram-id" className="block text-sm font-medium text-gray-700 mb-2">
                                Telegram User ID
                            </label>
                            <input
                                type="text"
                                id="telegram-id"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your Telegram User ID"
                            />
                        </div>
                        <button onClick={() => navigate("/chat")} className="px-6 cursor-pointer py-2 bg_g text-white rounded-lg hover:bg-blue-700 font-medium self-end">
                            Save
                        </button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8">
                    <button className="px-6 py-2.5 bg_g text-white rounded-lg hover:bg-blue-700 font-medium">
                        Configure
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Integrations;