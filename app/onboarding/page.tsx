'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/providers/AuthProvider';
import { updateUserProfile } from '@/lib/userService';
import Link from 'next/link';

export default function OnboardingPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        phone: '',
        dateOfBirth: '',
        gender: '',
        interests: [] as string[],
        notifications: true,
    });

    useEffect(() => {
        // Redirect if not authenticated
        if (!authLoading && !user) {
            window.location.href = '/signin';
        }
    }, [user, authLoading]);

    const steps = [
        {
            title: 'Welcome to Orian!',
            subtitle: 'Let\'s personalize your experience',
            icon: 'ri-hand-heart-line',
        },
        {
            title: 'Personal Information',
            subtitle: 'Help us get to know you better',
            icon: 'ri-user-line',
        },
        {
            title: 'Your Preferences',
            subtitle: 'Customize your shopping experience',
            icon: 'ri-settings-3-line',
        },
    ];

    const interestOptions = [
        'Fashion', 'Electronics', 'Home & Garden', 'Beauty',
        'Sports', 'Books', 'Toys', 'Food', 'Art', 'Jewelry'
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleInterest = (interest: string) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest]
        }));
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleComplete();
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSkip = () => {
        window.location.href = '/';
    };

    const handleComplete = async () => {
        if (!user) return;

        setIsSubmitting(true);
        try {
            await updateUserProfile(user.uid, {
                phone: formData.phone,
                dateOfBirth: formData.dateOfBirth,
                gender: formData.gender,
                preferences: {
                    interests: formData.interests,
                    notifications: formData.notifications,
                },
                onboardingCompleted: true,
            });

            window.location.href = '/profile';
        } catch (error) {
            console.error('Error completing onboarding:', error);
            alert('Failed to save your information. Please try again.');
            setIsSubmitting(false);
        }
    };

    if (authLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <div className="p-6 flex justify-between items-center">
                <button
                    onClick={handleSkip}
                    className="text-gray-500 hover:text-gray-700 font-medium"
                >
                    Skip for now
                </button>
                <div className="flex items-center space-x-2">
                    {steps.map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 rounded-full transition-all ${index === currentStep
                                ? 'w-8 bg-black'
                                : index < currentStep
                                    ? 'w-2 bg-black'
                                    : 'w-2 bg-gray-300'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-center px-8 pb-20">
                {/* Step 0: Welcome */}
                {currentStep === 0 && (
                    <div className="text-center space-y-8">
                        <div className="w-24 h-24 bg-gradient-to-br from-[#072415] to-[#0a3d1f] rounded-full flex items-center justify-center mx-auto">
                            <i className={`${steps[0].icon} text-white text-4xl`}></i>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-3">{steps[0].title}</h1>
                            <p className="text-gray-600">{steps[0].subtitle}</p>
                        </div>
                        <div className="space-y-4 max-w-md mx-auto">
                            <div className="flex items-start space-x-3 text-left">
                                <i className="ri-live-line text-2xl text-[#072415] mt-1"></i>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Live Shopping</h3>
                                    <p className="text-sm text-gray-600">Watch live streams and shop in real-time</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3 text-left">
                                <i className="ri-shopping-bag-line text-2xl text-[#072415] mt-1"></i>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Curated Products</h3>
                                    <p className="text-sm text-gray-600">Discover unique items from trusted sellers</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3 text-left">
                                <i className="ri-shield-check-line text-2xl text-[#072415] mt-1"></i>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Secure Shopping</h3>
                                    <p className="text-sm text-gray-600">Safe payments and buyer protection</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                    <div className="space-y-6 max-w-md mx-auto w-full">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-[#072415]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className={`${steps[1].icon} text-[#072415] text-2xl`}></i>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{steps[1].title}</h2>
                            <p className="text-gray-600">{steps[1].subtitle}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="+1 (555) 123-4567"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Gender
                            </label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                            >
                                <option value="">Select gender</option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                                <option value="Other">Other</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                        </div>
                    </div>
                )}

                {/* Step 2: Preferences */}
                {currentStep === 2 && (
                    <div className="space-y-6 max-w-md mx-auto w-full">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-[#072415]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className={`${steps[2].icon} text-[#072415] text-2xl`}></i>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{steps[2].title}</h2>
                            <p className="text-gray-600">{steps[2].subtitle}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                What are you interested in?
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {interestOptions.map((interest) => (
                                    <button
                                        key={interest}
                                        type="button"
                                        onClick={() => toggleInterest(interest)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${formData.interests.includes(interest)
                                            ? 'bg-black text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {interest}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                                <h3 className="font-medium text-gray-900">Enable Notifications</h3>
                                <p className="text-sm text-gray-600">Get updates on deals and live streams</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.notifications}
                                    onChange={(e) => setFormData(prev => ({ ...prev, notifications: e.target.checked }))}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                            </label>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Buttons */}
            <div className="p-6 border-t border-gray-100">
                <div className="flex space-x-3">
                    {currentStep > 0 && (
                        <button
                            onClick={handlePrevious}
                            className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                        >
                            Previous
                        </button>
                    )}
                    <button
                        onClick={handleNext}
                        disabled={isSubmitting}
                        className="flex-1 py-3 px-4 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                Saving...
                            </div>
                        ) : currentStep === steps.length - 1 ? (
                            'Complete'
                        ) : (
                            'Continue'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
