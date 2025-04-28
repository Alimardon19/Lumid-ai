import React from 'react';
import {
    RiAttachmentLine,
    RiEmotionLine,
    RiHomeLine,
    RiMoreFill,
    RiNotificationLine,
    RiPhoneLine,
    RiSearchLine,
    RiSendPlaneLine,
    RiSettingsLine,
    RiVideoLine
} from 'react-icons/ri';
import {useNavigate} from "react-router-dom";

interface ChatItem {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    time: string;
    unread?: number;
    isActive?: boolean;
}

interface Message {
    id: string;
    sender: 'user' | 'recipient';
    content: string;
    time: string;
    avatar: string;
}

const ChatAppItem: React.FC = () => {
    const [activeTab, setActiveTab] = React.useState<'active' | 'history'>('active');
    const navigate = useNavigate();

    const chatItems: ChatItem[] = [
        {
            id: '1',
            name: 'John Cooper',
            avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
            lastMessage: 'I need help with integration...',
            time: '10:42 AM',
            unread: 3
        },
        {
            id: '2',
            name: 'Sarah Wilson',
            avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
            lastMessage: 'Can you help me with...',
            time: '09:15 AM',
            isActive: true
        }
    ];

    const messages: Message[] = [
        {
            id: '1',
            sender: 'recipient',
            content: 'Hi, I need help with setting up the API integration. Can you guide me through the process?',
            time: '09:15 AM',
            avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg'
        },
        {
            id: '2',
            sender: 'user',
            content: 'Of course! I\'d be happy to help. Could you please specify which API you\'re trying to integrate?',
            time: '09:16 AM',
            avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg'
        },
        {
            id: '3',
            sender: 'recipient',
            content: 'I\'m trying to integrate the payment gateway API.',
            time: '09:18 AM',
            avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg'
        }
    ];

    return (
        <div className="h-full text-base-content">
            {/* Header */}
            <div id="header" className="fixed w-full top-0 bg-white border-b z-50">
                <div className="flex items-center justify-between px-4 py-2">
                    <div className="flex items-center space-x-4">
                        <img src="company-logo.png" alt="Company Logo" className="h-8"/>
                        <div className="flex items-center space-x-2">
                            <img
                                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                                className="w-8 h-8 rounded-full"
                                alt="User avatar"
                            />
                            <div>
                                <p className="text-sm font-medium">Mila</p>
                                <p className="text-xs text-gray-500">Customer Support</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-600 hover:text-gray-900">
                            <RiHomeLine onClick={() => navigate("/")} className="text-xl"/>
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                            <RiNotificationLine className="text-xl"/>
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                            <RiSettingsLine className="text-xl"/>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Container */}
            <div className="flex min-h-screen pt-16">
                {/* Sidebar */}
                <div id="sidebar" className="w-80 border-r bg-white">
                    {/* Tabs */}
                    <div className="border-b">
                        <div className="flex">
                            <button
                                onClick={() => setActiveTab('active')}
                                className={`flex-1 px-4 py-3 text-sm font-medium ${activeTab === 'active' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Active Chats
                                <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">12</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('history')}
                                className={`flex-1 px-4 py-3 text-sm font-medium ${activeTab === 'history' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Chat History
                            </button>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="p-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
                            />
                            <RiSearchLine className="absolute left-3 top-2.5 text-gray-400"/>
                        </div>
                    </div>

                    {/* Chat List */}
                    <div id="chatList" className="overflow-y-auto">
                        {chatItems.map((chat) => (
                            <div
                                key={chat.id}
                                className={`flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer border-b ${chat.isActive ? 'bg-blue-50 hover:bg-blue-100' : ''}`}
                            >
                                <img
                                    src={chat.avatar}
                                    className="w-10 h-10 rounded-full"
                                    alt={`${chat.name}'s avatar`}
                                />
                                <div className="ml-3 flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium">{chat.name}</h3>
                                        <span className="text-xs text-gray-500">{chat.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                                </div>
                                {chat.unread && (
                                    <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">
                    {chat.unread}
                  </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Content Area */}
                <div id="chatContent" className="flex-1 flex flex-col bg-gray-50">
                    {/* Chat Header */}
                    <div id="chatHeader" className="bg-white border-b px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <img
                                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
                                    className="w-10 h-10 rounded-full"
                                    alt="Sarah Wilson's avatar"
                                />
                                <div className="ml-3">
                                    <h2 className="text-sm font-medium">Sarah Wilson</h2>
                                    <p className="text-xs text-gray-500">Online • Last seen 2m ago</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button className="text-gray-600 hover:text-gray-900">
                                    <RiPhoneLine/>
                                </button>
                                <button className="text-gray-600 hover:text-gray-900">
                                    <RiVideoLine/>
                                </button>
                                <button className="text-gray-600 hover:text-gray-900">
                                    <RiMoreFill/>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div id="chatMessages" className="flex-1 overflow-y-auto p-6 space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex items-start ${message.sender === 'user' ? 'justify-end' : ''}`}
                            >
                                {message.sender === 'recipient' && (
                                    <img
                                        src={message.avatar}
                                        className="w-8 h-8 rounded-full"
                                        alt="Sender avatar"
                                    />
                                )}
                                <div className={message.sender === 'recipient' ? 'ml-3' : 'mr-3'}>
                                    <div className={`rounded-lg p-3 shadow-sm max-w-lg ${
                                        message.sender === 'user'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white'
                                    }`}>
                                        <p className="text-sm">{message.content}</p>
                                    </div>
                                    <span className={`text-xs text-gray-500 mt-1 ${
                                        message.sender === 'user' ? 'flex justify-end' : ''
                                    }`}>
                    {message.time}
                  </span>
                                </div>
                                {message.sender === 'user' && (
                                    <img
                                        src={message.avatar}
                                        className="w-8 h-8 rounded-full"
                                        alt="User avatar"
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Chat Input */}
                    <div id="chatInput" className="bg-white border-t p-4">
                        <div className="flex items-center space-x-4">
                            <button className="text-gray-600 hover:text-gray-900">
                                <RiAttachmentLine/>
                            </button>
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Type your message..."
                                    className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <button className="text-gray-600 hover:text-gray-900">
                                <RiEmotionLine/>
                            </button>
                            <button className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-blue-700">
                                Send
                                <RiSendPlaneLine className="ml-2 inline"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ChatAppItem;