import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {storage, StorageExpiry} from "../../utils/storage.ts";
import {LOCAL_USER_DATA} from "../../config/constants.ts";
import {notification} from "antd";


const AuthPage = () => {
    const [sendLoading, setSendLoading] = useState(false);
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setSendLoading(true);

        axios.get("https://api.nextflow.uz/webhook/v1/customer/getUser", {
            headers: {
                'Authorization': `Basic ${btoa(`${e.target[0].value}:${e.target[1].value}`)}`
            }
        }).then((response) => {
            storage.set(LOCAL_USER_DATA, {...response?.data, password: e.target[1].value}, StorageExpiry.DAY);
            navigate('/');
        }).catch((err) => {
            console.error(err);
            api.error({message: "The email or password you entered is incorrect. Please try again.", placement: "top"});
        }).finally(() => {
            setSendLoading(false);
        });
    };


    return (
        <>
            {contextHolder}
            <div className="min-h-screen flex items-center justify-center">
                <div className="relative w-full max-w-md p-8 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/60" data-aos="zoom-in">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">AI Agents Authorization</h1>
                        <p className="text-gray-600">Enter your details to continue</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="relative">
                                <i className="ri-mail-fill absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                <input
                                    type="email"
                                    id="email"
                                    name="mail"
                                    className="block w-full pl-10 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <i className="ri-lock-2-fill absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="block w-full pl-10 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                                    placeholder="enter your password"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={sendLoading}
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 rounded-lg hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50 transition-all duration-200 flex items-center justify-center space-x-2"
                        >
                            { sendLoading ?
                                <div className="animate-pulse">
                                    <span>Sending...</span>
                                </div> :
                                <div>
                                    <span>LOGIN</span>
                                    &nbsp;&nbsp;&nbsp;
                                    <i className="ri-arrow-right-line"/>
                                </div>
                            }
                        </button>
                    </form>
                    <div className="mt-3 flex items-center justify-center space-x-2">
                        <span className="text-gray-500">not registered?</span> <span onClick={() => navigate("/registered")}
                                                                                     className="text-blue-600 cursor-pointer">Create an account</span>
                    </div>
                    <div className="mt-6 text-center text-sm text-gray-500">
                        <p>By continuing, you agree to our</p>
                        <div className="mt-1">
                            <span className="text-blue-600 hover:text-blue-700 cursor-pointer">Terms of Service</span>
                            <span className="mx-2">·</span>
                            <span className="text-blue-600 hover:text-blue-700 cursor-pointer">Privacy Policy</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthPage;