import React, {useEffect, useState} from 'react';
import {RiBrainLine, RiCpuLine, RiNodeTree} from 'react-icons/ri';
import {useNavigate} from "react-router-dom";


const CheckDocuments: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            if (progress < 100) {
                const increment = Math.floor(Math.random() * 2);
                setProgress(prev => prev + increment);
            }
        }, 100);

        if (progress >= 100) {
            setTimeout(() => {
                // navigate('/integration');
                navigate('/chat');
            }, 1500);
        }

        return () => clearInterval(interval);
    }, [progress]);


    return (
        <div className={`${progress >= 100 && 'animate-pulse'} min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4`}>
            <div className="max-w-3xl w-full">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                        Milla is Learning Your Business
                    </h1>
                    <p className="text-lg text-slate-600">
                        Analyzing and processing your business data for optimal insights
                    </p>
                </div>

                <div className="relative mb-12 flex justify-center pb-7">
                    <img
                        className="w-64 h-64 rounded-full shadow-lg"
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/26d44f100b-0dca9a3d4d0f1d50b74c.png"
                        alt="futuristic AI female robot face with glowing blue circuits, minimal, elegant, sci-fi style, looking thoughtful"
                    />

                    <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 w-full max-w-md">
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000"
                                style={{width: `${progress}%`}}
                            />
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="text-sm text-slate-600">Processing</span>
                            <span className="text-sm font-semibold text-blue-600">
                                {progress}%
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200">
                        <div className="flex items-center mb-3">
                            <RiBrainLine className="text-blue-500 text-xl"/>
                            <span className="ml-3 font-semibold text-slate-700">Data Analysis</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-600">Processing</span>
                            <span className="text-sm font-semibold text-blue-500">89%</span>
                        </div>
                    </div>

                    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200">
                        <div className="flex items-center mb-3">
                            <RiNodeTree className="text-purple-500 text-xl"/>
                            <span className="ml-3 font-semibold text-slate-700">Pattern Recognition</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-600">Learning</span>
                            <span className="text-sm font-semibold text-purple-500">67%</span>
                        </div>
                    </div>

                    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200">
                        <div className="flex items-center mb-3">
                            <RiCpuLine className="text-cyan-500 text-xl"/>
                            <span className="ml-3 font-semibold text-slate-700">Model Training</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-600">Optimizing</span>
                            <span className="text-sm font-semibold text-cyan-500">82%</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center text-sm text-slate-500">
                    <p>Estimated time remaining: 2 minutes</p>
                    <p className="mt-1">Processing 2,457 data points</p>
                </div>
            </div>
        </div>
    );
};


export default CheckDocuments;