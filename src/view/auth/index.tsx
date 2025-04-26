import {useState} from "react";
import OTPVerification from "./OTPVerification.tsx";


const AuthPage = () => {
    const [sendUserData, setSendUserData] = useState(false);
    const [sendLoading, setSendLoading] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setSendLoading(true);
        setTimeout(() => {
            setSendUserData(true);
            setSendLoading(false);
        }, 3000)
        // Add your form submission logic here
    };

    const formatUzPhoneNumber = (e: React.FormEvent<HTMLInputElement>) => {
        const input = e.currentTarget;
        const inputEvent = e.nativeEvent as InputEvent;
        const isBackspace = inputEvent.inputType === 'deleteContentBackward';

        // Faqat raqamlarni qoldiramiz
        let value = input.value.replace(/\D/g, '');

        // Agar +998 dan boshlanmasa va backspace bosilmagan bo'lsa
        if (!value.startsWith('998') && !isBackspace) {
            value = '998' + value;
        }

        // Maksimal 12 ta belgi (998 + 9 raqam)
        if (value.length > 12) {
            value = value.substring(0, 12);
        }

        // Formatlash
        let formattedValue = '';
        if (value.length > 0) {
            formattedValue = `+${value.substring(0, 3)}`;
            if (value.length > 3) {
                formattedValue += ` ${value.substring(3, 5)}`;
            }
            if (value.length > 5) {
                formattedValue += ` ${value.substring(5, 8)}`;
            }
            if (value.length > 8) {
                formattedValue += ` ${value.substring(8, 10)}`;
            }
            if (value.length > 10) {
                formattedValue += ` ${value.substring(10, 12)}`;
            }
        }

        // Agar backspace bosilgan bo'lsa, cursor pozitsiyasini saqlab qolamiz
        if (isBackspace && input.selectionStart) {
            const cursorPos = input.selectionStart;
            input.value = formattedValue;
            input.setSelectionRange(cursorPos, cursorPos);
        } else {
            input.value = formattedValue;
        }
    };


    return ( sendUserData ? <OTPVerification setSendUserData={setSendUserData}/> :
        <div className="min-h-screen flex items-center justify-center">
            <div className="relative w-full max-w-md p-8 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/60" data-aos="zoom-in">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">AI Agents Authorization</h1>
                    <p className="text-gray-600">Enter your details to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <div className="relative">
                            <i className="ri-user-3-fill absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                className="block w-full pl-10 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <div className="relative">
                            <i className="ri-phone-fill absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className="block w-full pl-10 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                                placeholder="+998 (90) 000 00 00"
                                required
                                onChange={formatUzPhoneNumber}
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
                                <span>Continue</span>
                                &nbsp;&nbsp;&nbsp;
                                <i className="ri-arrow-right-line"/>
                            </div>
                        }
                    </button>
                </form>

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

export default AuthPage;