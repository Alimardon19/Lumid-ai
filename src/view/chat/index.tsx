import React from 'react';
import {
    RiHomeLine, RiNotificationLine, RiSettingsLine, RiSearchLine,
    RiChat1Line, RiTimeLine, RiCheckboxCircleLine, RiStarLine,
    RiMessage2Line, RiCheckLine, RiUserAddLine, RiFilterLine,
    RiAddLine, RiArrowUpLine, RiArrowDownLine
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

interface ActivityItem {
    id: string;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
    title: string;
    time: string;
}

interface StatCard {
    id: string;
    title: string;
    value: string;
    trend: 'up' | 'down';
    trendValue: string;
    icon: React.ReactNode;
    iconColor: string;
}

const AppChat: React.FC = () => {
    const [activeTab, setActiveTab] = React.useState<'active' | 'history'>('active');
    const navigate = useNavigate();

    const chatItems: ChatItem[] = [
        {
            id: '1',
            name: 'John Cooper',
            avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
            lastMessage: 'I need help with integration...',
            time: '10:42 AM'
        },
        {
            id: '2',
            name: 'Sarah Wilson',
            avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
            lastMessage: 'Can you help me with...',
            time: '09:15 AM',
            unread: 2,
            isActive: true
        },
        {
            id: '3',
            name: 'Mike Johnson',
            avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
            lastMessage: 'Thanks for your help!',
            time: 'Yesterday'
        }
    ];

    const activityItems: ActivityItem[] = [
        {
            id: '1',
            icon: <RiMessage2Line />,
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-500',
            title: 'New message from Sarah Wilson',
            time: '2 minutes ago'
        },
        {
            id: '2',
            icon: <RiCheckLine />,
            iconBg: 'bg-green-100',
            iconColor: 'text-green-500',
            title: 'Chat resolved with John Cooper',
            time: '15 minutes ago'
        },
        {
            id: '3',
            icon: <RiUserAddLine />,
            iconBg: 'bg-purple-100',
            iconColor: 'text-purple-500',
            title: 'New chat assigned from Mike Johnson',
            time: '1 hour ago'
        }
    ];

    const statCards: StatCard[] = [
        {
            id: '1',
            title: 'Active Chats',
            value: '24',
            trend: 'up',
            trendValue: '12% from yesterday',
            icon: <RiChat1Line />,
            iconColor: 'text-blue-500'
        },
        {
            id: '2',
            title: 'Response Time',
            value: '1.8m',
            trend: 'down',
            trendValue: '3% from average',
            icon: <RiTimeLine />,
            iconColor: 'text-purple-500'
        },
        {
            id: '3',
            title: 'Resolved Today',
            value: '89',
            trend: 'up',
            trendValue: '8% from yesterday',
            icon: <RiCheckboxCircleLine />,
            iconColor: 'text-green-500'
        },
        {
            id: '4',
            title: 'Customer Satisfaction',
            value: '4.8',
            trend: 'up',
            trendValue: '2% from last week',
            icon: <RiStarLine />,
            iconColor: 'text-yellow-500'
        }
    ];

    return (
        <div className="h-full text-base-content">
            {/* Header */}
            <div id="header" className="fixed w-full top-0 bg-white border-b z-50">
                <div className="flex items-center justify-between px-4 py-2">
                    <div className="flex items-center space-x-4">
                        <img src="company-logo.png" alt="Company Logo" className="h-8" />
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
                            <RiHomeLine className="text-xl" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                            <RiNotificationLine className="text-xl" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                            <RiSettingsLine className="text-xl" />
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
                            <RiSearchLine className="absolute left-3 top-2.5 text-gray-400" />
                        </div>
                    </div>

                    {/* Chat List */}
                    <div id="chatList" className="overflow-y-auto">
                        {chatItems.map((chat) => (
                            <div
                                onClick={() => navigate('12')}
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
                                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {chat.unread}
                  </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content Area */}
                <div id="mainContent" className="flex-1 bg-gray-50 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-semibold">Dashboard</h1>
                        <div className="flex space-x-4">
                            <button className="px-4 py-2 bg-white rounded-lg border hover:bg-gray-50 text-sm flex items-center">
                                <RiFilterLine className="mr-2" /> Filter
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center">
                                <RiAddLine className="mr-2" /> New Chat
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-4 gap-6 mb-6">
                        {statCards.map((card) => (
                            <div key={card.id} className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-gray-500 text-sm">{card.title}</h3>
                                    <span className={`${card.iconColor}`}>{card.icon}</span>
                                </div>
                                <p className="text-2xl font-semibold mt-2">{card.value}</p>
                                <p className={`text-xs ${card.trend === 'up' ? 'text-green-500' : 'text-red-500'} mt-2 flex items-center`}>
                                    {card.trend === 'up' ? (
                                        <RiArrowUpLine className="mr-1" />
                                    ) : (
                                        <RiArrowDownLine className="mr-1" />
                                    )}
                                    {card.trendValue}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="p-6 border-b">
                            <h2 className="text-lg font-semibold">Recent Activity</h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {activityItems.map((activity) => (
                                    <div key={activity.id} className="flex items-center">
                                        <div className={`w-10 h-10 rounded-full ${activity.iconBg} flex items-center justify-center`}>
                                            <span className={activity.iconColor}>{activity.icon}</span>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm">{activity.title}</p>
                                            <p className="text-xs text-gray-500">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppChat;