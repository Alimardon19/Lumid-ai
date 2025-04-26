import {useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from 'react';
import {OTPInput} from "../../components/otp-input.tsx";


type OTPVerificationPropTypes = {
    setSendUserData: React.Dispatch<React.SetStateAction<boolean>>;
};

const OTPVerification: React.FC<OTPVerificationPropTypes> = ({setSendUserData}) => {
    const [otp, setOtp] = useState<string[]>(['', '', '', '']);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Focus the first input on component mount
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input if a digit was entered
        if (value && index < 3 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            // Move focus to previous input on backspace when current is empty
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            const code = otp.join('');
            console.log('Verifying code:', code);
            // Add your verification logic here
        } finally {
            setIsSubmitting(false);
            navigate('/');
        }
    };

    const handleResendCode = () => {
        setSendUserData(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md mx-auto p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg" data-aos="zoom-in">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-3">Verification Code</h1>
                    <p className="text-gray-600">Please enter the 4-digit code sent to your device</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="flex justify-between gap-4">
                        {otp.map((digit, index) => (
                            <OTPInput
                                key={index}
                                index={index}
                                value={digit}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                inputRef={(el) => (inputRefs.current[index] = el)}
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || otp.some(d => !d)}
                        className={`w-full py-4 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 ${
                            isSubmitting || otp.some(d => !d)
                                ? 'bg-blue-400 cursor-not-allowed'
                                : 'bg_g hover:bg-blue-600'
                        }`}
                    >
                        <i className="ri-lock-2-fill"/>
                        {isSubmitting ? 'Verifying...' : 'Verify Code'}
                    </button>

                    <div className="text-center text-gray-600">
                        <p className="mb-2">Didn't receive the code?</p>
                        <button
                            type="button"
                            onClick={handleResendCode}
                            className="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer bg-transparent border-none"
                        >
                            Resend Code
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OTPVerification;