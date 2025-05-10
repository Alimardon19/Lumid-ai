import React, {useEffect, useRef, useState} from 'react';
import {
    RiBookLine,
    RiChat1Line,
    RiCheckLine,
    RiCloseLine,
    RiCustomerServiceLine,
    RiDashboardLine,
    RiHeadphoneLine,
    RiInformationLine,
    RiLineChartLine,
    RiMailLine,
    RiNotificationLine,
    RiPieChartLine,
    RiRobotLine,
    RiSearchLine,
    RiSendPlaneLine,
    RiSettingsLine,
    RiUserStarLine,
    RiLogoutCircleLine
} from 'react-icons/ri';
import {useNavigate} from "react-router-dom";
import {storage} from "../../utils/storage.ts";
import {LOCAL_USER_DATA} from "../../config/constants.ts";

interface AICardProps {
    id: string;
    title: string;
    description: string;
    category: string;
    icon: React.ReactNode;
    features: {
        text: string;
        iconColor: string;
    }[];
    disabled: boolean;
    imageUrl: string;
    path: string;
}

const AICard: React.FC<AICardProps> = (props) => {
    const {id, title, description, category, icon, features, imageUrl, disabled, path} = props;
    const navigate = useNavigate();

    return (
        <div id={`${id}-card`}
             className={`${disabled && 'opacity-75'} bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300`}>
            <div className="h-48 overflow-hidden">
                <img className="w-full h-full object-cover" src={imageUrl} alt={title}/>
            </div>
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                        {icon}
                    </div>
                    <span className="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-full">{category}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 mb-4">{description}</p>
                <ul className="space-y-2 mb-6">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                            <RiCheckLine className={`text-${feature.iconColor}-600 mr-2`}/>
                            {feature.text}
                        </li>
                    ))}
                </ul>
                <button
                    onClick={() => navigate(path)}
                    disabled={disabled}
                    className={`${disabled ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'} w-full py-3 px-4 bg_g hover:bg-blue-700 text-white rounded-lg transition-colors duration-300`}
                >
                    Try {title}
                </button>
            </div>
        </div>
    );
}

const Dashboard: React.FC = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
    const [messageInput, setMessageInput] = useState('');
    const chatMessagesRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!storage.has(LOCAL_USER_DATA)) {
            storage.clear();
            navigate("/login");
        }
    }, []);


    const aiAgents: AICardProps[] = [
        {
            id: "mila",
            path: '/mila-onboarding',
            title: "Mila AI",
            disabled: false,
            description: "Always-On Customer Support",
            category: "Customer Support",
            icon: <RiHeadphoneLine className="text-blue-600 text-xl"/>,
            features: [
                {text: "24/7 Customer Assistance", iconColor: "blue"},
                {text: "Multi-language Support", iconColor: "blue"},
                {text: "Ticket Management", iconColor: "blue"}
            ],
            imageUrl: "https://storage.googleapis.com/uxpilot-auth.appspot.com/68939667ab-d41291401c55e9004bb7.png"
        },
        {
            id: "zara",
            path: '/mila-onboarding',
            title: "Zara AI",
            disabled: true,
            description: "Your Smart Hiring Sidekick",
            category: "HR & Recruiting",
            icon: <RiUserStarLine className="text-blue-600 text-xl"/>,
            features: [
                {text: "Resume Screening & Scoring", iconColor: "purple"},
                {text: "Interview Question Generator", iconColor: "purple"},
                {text: "Candidate Assessment Reports", iconColor: "purple"}
            ],
            imageUrl: "https://storage.googleapis.com/uxpilot-auth.appspot.com/68939667ab-de385321a3379c48695b.png"
        },
        {
            id: "bella",
            path: '/mila-onboarding',
            title: "Bella AI",
            disabled: true,
            description: "The Sales Coach You've Been Missing",
            category: "Sales",
            icon: <RiLineChartLine className="text-blue-600 text-xl"/>,
            features: [
                {text: "Sales Performance Analytics", iconColor: "green"},
                {text: "Deal Probability Scoring", iconColor: "green"},
                {text: "Pipeline Optimization", iconColor: "green"}
            ],
            imageUrl: "https://storage.googleapis.com/uxpilot-auth.appspot.com/68939667ab-91c50c5e0d69814e0420.png"
        }
    ];

    const sendMessage = () => {
        if (messageInput.trim()) {
            setMessages([...messages, {text: messageInput, isUser: true}]);
            setMessageInput('');

            setTimeout(() => {
                setMessages(prev => [...prev, {
                    text: "Thank you for reaching out! Our support team will respond shortly.",
                    isUser: false
                }]);
            }, 1000);
        }
    };

    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="flex h-full">
            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
                <div className="flex items-center justify-center h-16 px-4 border-b">
                    <span className="text-xl font-bold text-indigo-600">AI Agents Hub</span>
                </div>

                <nav className="mt-6">
                    <div className="px-4 space-y-4">
                        <div className="space-y-2">
                            <div
                                className="flex items-center px-4 py-2.5 bg-indigo-50 text-indigo-600 rounded-lg cursor-pointer">
                                <RiDashboardLine className="w-5 h-5"/>
                                <span className="ml-3">Dashboard</span>
                            </div>

                            <div
                                className="flex items-center px-4 py-2.5 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg cursor-pointer">
                                <RiRobotLine className="w-5 h-5"/>
                                <span className="ml-3">My Agents</span>
                            </div>

                            <div
                                className="flex items-center px-4 py-2.5 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg cursor-pointer">
                                <RiBookLine className="w-5 h-5"/>
                                <span className="ml-3">Knowledge Base</span>
                            </div>

                            <div
                                className="flex items-center px-4 py-2.5 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg cursor-pointer">
                                <RiPieChartLine className="w-5 h-5"/>
                                <span className="ml-3">Analytics</span>
                            </div>

                            <div
                                className="flex items-center px-4 py-2.5 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg cursor-pointer">
                                <RiSettingsLine className="w-5 h-5"/>
                                <span className="ml-3">Settings</span>
                            </div>
                        </div>

                        <hr className="border-gray-200"/>

                        <div className="space-y-2">
                            <div
                                className="flex items-center px-4 py-2.5 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg cursor-pointer">
                                <RiCustomerServiceLine className="w-5 h-5"/>
                                <span className="ml-3">Support</span>
                            </div>

                            <div
                                className="flex items-center px-4 py-2.5 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg cursor-pointer">
                                <RiInformationLine className="w-5 h-5"/>
                                <span className="ml-3">Documentation</span>
                            </div>
                            <div
                                onClick={() => {
                                    storage.clear();
                                    navigate("/login");
                                }}
                                className="flex items-center px-4 py-2.5 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg cursor-pointer">
                                <RiLogoutCircleLine  className="w-5 h-5"/>
                                <span className="ml-3">Log out</span>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-64">
                {/* Top Navigation */}
                <header className="shadow-sm bg-white">
                    <div className="flex items-center justify-between h-16 px-8">
                        <div className="flex items-center">
                            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <RiSearchLine className="text-gray-400"/>
                </span>
                                <input
                                    type="text"
                                    className="w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Search..."
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="p-2 text-gray-400 hover:text-gray-600">
                                <RiNotificationLine className="w-6 h-6"/>
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600">
                                <RiMailLine className="w-6 h-6"/>
                            </button>
                            <img
                                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                                className="w-8 h-8 rounded-full"
                                alt="User avatar"
                            />
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Welcome to AI Agents Hub</h1>
                        <p className="mt-1 text-gray-600">Select an AI agent to get started</p>
                    </div>

                    {/* Category Filter Tabs */}
                    <div className="mb-8">
                        <div className="flex space-x-4 border-b border-gray-200">
                            <button className="px-6 py-3 text-blue-600 border-b-2 border-blue-600 font-medium">
                                All
                            </button>
                            <button
                                className="px-6 py-3 text-gray-500 hover:text-gray-700 font-medium opacity-50 cursor-not-allowed">
                                Customer Support
                            </button>
                            <button
                                className="px-6 py-3 text-gray-500 hover:text-gray-700 font-medium opacity-50 cursor-not-allowed">
                                Marketing
                            </button>
                            <button
                                className="px-6 py-3 text-gray-500 hover:text-gray-700 font-medium opacity-50 cursor-not-allowed">
                                Sales
                            </button>
                            <button
                                className="px-6 py-3 text-gray-500 hover:text-gray-700 font-medium opacity-50 cursor-not-allowed">
                                HR & Recruiting
                            </button>
                        </div>
                    </div>

                    {/* AI Agents Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {aiAgents.map(agent => (
                            <AICard key={agent.id} {...agent} />
                        ))}
                    </div>
                </main>

                {/* Support Chat Button & Widget */}
                <div className="fixed bottom-8 right-8 z-50">
                    <button
                        onClick={() => setIsChatOpen(!isChatOpen)}
                        className="bg_g hover:bg-blue-700 text-white rounded-full p-4 shadow-lg flex items-center space-x-2"
                    >
                        <RiChat1Line className="text-xl"/>
                        <span className="mr-1">Support</span>
                    </button>

                    {/* Chat Widget */}
                    {isChatOpen && (
                        <div className="absolute bottom-16 right-0 w-96 bg-white rounded-xl shadow-2xl">
                            <div className="p-4 bg_g text-white rounded-t-xl flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <RiCustomerServiceLine/>
                                    <span className="font-semibold">Support Chat</span>
                                </div>
                                <button
                                    onClick={() => setIsChatOpen(false)}
                                    className="text-white hover:text-gray-200"
                                >
                                    <RiCloseLine/>
                                </button>
                            </div>
                            <div
                                ref={chatMessagesRef}
                                className="h-96 p-4 overflow-y-auto"
                            >
                                {messages.length === 0 && (
                                    <div className="text-center text-gray-500 mb-4">
                                        Our support team is here to help!
                                    </div>
                                )}
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`flex mb-4 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`rounded-lg px-4 py-2 max-w-[80%] ${
                                            message.isUser ? 'bg-blue-100 text-gray-800' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            <p>{message.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 border-t">
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        onKeyUp={(e) => e.key === 'Enter' && sendMessage()}
                                        className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Type your message..."
                                    />
                                    <button
                                        onClick={sendMessage}
                                        className="bg_g hover:bg-blue-700 text-white rounded-lg px-4 py-2"
                                    >
                                        <RiSendPlaneLine/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;