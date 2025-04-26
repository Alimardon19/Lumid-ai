import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {RiArrowLeftLine, RiArrowRightLine, RiFileTextLine, RiUploadCloudLine} from 'react-icons/ri';



const StepCompanyInfo = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        companyName: '',
        industry: '',
        email: '',
        website: '',
        companyInfoFile: null,
        faqFile: null
    });
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({
                ...prev,
                [field]: e.target.files![0]
            }));
        }
    };

    const handleNext = () => {
        if (currentStep === 1) {
            setCurrentStep(2);
        } else {
            // Handle form submission
            console.log('Form submitted:', formData);
            navigate('/check-documents');
        }
    };

    const handlePrevious = () => {
        setCurrentStep(1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Progress Steps */}
                <div className="mb-12">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className={`rounded-full h-10 w-10 flex items-center justify-center ${
                                currentStep === 1 ? 'bg_g text-white' : 'bg-gray-200'
                            }`}>
                                1
                            </div>
                            <div className="ml-4">
                                <p className={`text-sm font-medium ${
                                    currentStep === 1 ? 'text-blue-600' : 'text-gray-500'
                                }`}>
                                    Company Info
                                </p>
                            </div>
                        </div>
                        <div className="flex-1 mx-4">
                            <div className={`h-1 ${
                                currentStep === 2 ? 'bg_g' : 'bg-gray-200'
                            }`}></div>
                        </div>
                        <div className="flex items-center">
                            <div className={`rounded-full h-10 w-10 flex items-center justify-center ${
                                currentStep === 2 ? 'bg_g text-white' : 'bg-gray-200'
                            }`}>
                                2
                            </div>
                            <div className="ml-4">
                                <p className={`text-sm font-medium ${
                                    currentStep === 2 ? 'text-blue-600' : 'text-gray-500'
                                }`}>
                                    Business Details
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 1 Form */}
                <div className={`bg-white rounded-xl shadow-sm p-8 mb-8 ${
                    currentStep === 1 ? 'block' : 'hidden'
                }`}>
                    <h2 className="text-2xl font-semibold mb-8">Company Information</h2>

                    <div className="space-y-6">
                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter company name"
                            />
                        </div>

                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                            <select
                                name="industry"
                                value={formData.industry}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                            >
                                <option value="">Select Industry</option>
                                <option value="technology">Technology</option>
                                <option value="healthcare">Healthcare</option>
                                <option value="finance">Finance</option>
                                <option value="retail">Retail</option>
                                <option value="other">Other</option>
                            </select>
                            {formData.industry === 'other' && (
                                <input
                                    type="text"
                                    name="industryOther"
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Specify your industry"
                                />
                            )}
                        </div>

                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Company Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter company email"
                            />
                        </div>
                    </div>
                </div>

                {/* Step 2 Form */}
                <div className={`bg-white rounded-xl shadow-sm p-8 mb-8 ${
                    currentStep === 2 ? 'block' : 'hidden'
                }`}>
                    <h2 className="text-2xl font-semibold mb-8">Additional Information</h2>

                    <div className="space-y-6">
                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Company Information</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <RiUploadCloudLine className="text-3xl text-gray-400 mb-2 mx-auto"/>
                                <p className="text-sm text-gray-500">Drag and drop your files here, or click to
                                    browse</p>
                                <input
                                    type="file"
                                    id="company-info-file"
                                    onChange={(e) => handleFileChange(e, 'companyInfoFile')}
                                    className="hidden"
                                />
                                <button
                                    onClick={() => document.getElementById('company-info-file')?.click()}
                                    className="mt-2 px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                                >
                                    Browse Files
                                </button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700 mb-2">FAQ Document</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <RiFileTextLine className="text-3xl text-gray-400 mb-2 mx-auto"/>
                                <p className="text-sm text-gray-500">Upload your FAQ document</p>
                                <input
                                    type="file"
                                    id="faq-file"
                                    onChange={(e) => handleFileChange(e, 'faqFile')}
                                    className="hidden"
                                />
                                <button
                                    onClick={() => document.getElementById('faq-file')?.click()}
                                    className="mt-2 px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                                >
                                    Select File
                                </button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Company Website
                                (Optional)</label>
                            <input
                                type="url"
                                name="website"
                                value={formData.website}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="https://www.example.com"
                            />
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                    <button
                        onClick={handlePrevious}
                        className={`px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 ${
                            currentStep === 1 ? 'hidden' : 'block'
                        }`}
                    >
                        <RiArrowLeftLine className="inline mr-2"/>
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        className={`ml-auto px-6 py-2 bg_g text-white rounded-lg hover:bg-blue-700 ${
                            currentStep === 1 ? 'w-full' : ''
                        }`}
                    >
                        {currentStep === 1 ? 'Next' : 'Submit'}
                        <RiArrowRightLine className="inline ml-2"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StepCompanyInfo;