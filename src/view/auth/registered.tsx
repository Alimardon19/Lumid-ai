import {useState} from "react";
import {useNavigate} from "react-router-dom";
import service from "../../config/FetchInterceptor.ts";


const RegisteredUser = () => {
    const [sendLoading, setSendLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const values = {
            [e.target[0].name]: e.target[0].value,
            [e.target[1].name]: e.target[1].value,
            [e.target[2].name]: e.target[2].value,
            [e.target[3].name]: e.target[3].value,
        };
        setSendLoading(true);
        service.post("/customer/saveUser", {...values, language_id: 0}).then(() => {
            navigate("/login");
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setSendLoading(false);
        })
    };


    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="relative w-full max-w-md p-8 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/60" data-aos="zoom-in">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">AI Agents Authorization</h1>
                    <p className="text-gray-600">Enter your details to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">Firstname</label>
                        <div className="relative">
                            <i className="ri-user-3-fill absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                                className="block w-full pl-10 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                                placeholder="Enter your firstname"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Lastname</label>
                        <div className="relative">
                            <i className="ri-user-3-fill absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            <input
                                type="text"
                                id="lastname"
                                name="username"
                                className="block w-full pl-10 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                                placeholder="Enter your lastname"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="mail" className="block text-sm font-medium text-gray-700">Email</label>
                        <div className="relative">
                            <i className="ri-mail-fill absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            <input
                                type="email"
                                id="mail"
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
                            <i className="ri-lock-fill absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="block w-full pl-10 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                                placeholder="Enter your password"
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
                                <span>REGISTERED</span>
                                &nbsp;&nbsp;&nbsp;
                                <i className="ri-arrow-right-line"/>
                            </div>
                        }
                    </button>
                </form>
                <div className="mt-3 flex items-center justify-center space-x-2">
                    <span className="text-gray-500">Already have an account?</span> <span onClick={() => navigate("/login")} className="text-blue-600 cursor-pointer">Sign in</span>
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
    );
};

export default RegisteredUser;