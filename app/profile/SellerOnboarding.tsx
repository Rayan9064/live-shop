
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SellerOnboarding() {
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const benefits = [
    {
      icon: 'ri-money-dollar-circle-line',
      title: 'Earn More',
      description: 'Earn more per hour than any other marketplace'
    },
    {
      icon: 'ri-live-line',
      title: 'Live Selling',
      description: 'Sell products through live streaming'
    },
    {
      icon: 'ri-time-line',
      title: 'Sell in Seconds',
      description: 'Quick setup and instant selling'
    },
    {
      icon: 'ri-group-line',
      title: 'Large Audience',
      description: 'Reach thousands of potential buyers'
    }
  ];

  const setupSteps = [
    {
      title: 'Personal Information',
      description: 'Complete your seller profile',
      icon: 'ri-user-line',
      fields: ['Full Name', 'Phone Number', 'Business Type']
    },
    {
      title: 'Business Details',
      description: 'Tell us about your business',
      icon: 'ri-store-line',
      fields: ['Business Name', 'Category', 'Description']
    },
    {
      title: 'Verification',
      description: 'Verify your identity',
      icon: 'ri-shield-check-line',
      fields: ['ID Document', 'Business License', 'Tax Information']
    },
    {
      title: 'Payment Setup',
      description: 'Setup payment methods',
      icon: 'ri-bank-card-line',
      fields: ['Bank Account', 'Payment Preferences', 'Tax Details']
    }
  ];

  const handleStartSelling = () => {
    setShowModal(true);
    setCurrentStep(0);
  };

  const handleNextStep = () => {
    if (currentStep < setupSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete setup
      setShowModal(false);
      alert('Congratulations! Your seller account is being reviewed. You will receive an email within 24 hours.');
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      <div className="px-4">
        <div className="bg-gradient-to-br from-[#072415] to-[#0a3d1f] rounded-3xl p-6 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
            <img
              src="https://readdy.ai/api/search-image?query=Abstract%20geometric%20pattern%20with%20circles%20and%20lines%2C%20minimalist%20design%2C%20white%20color%2C%20transparent%20background%2C%20modern%20tech%20pattern%2C%20clean%20vector%20illustration&width=128&height=128&seq=seller-pattern-001&orientation=squarish"
              alt="Pattern"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-store-line text-white text-xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold">Become a Seller</h3>
                <p className="text-white/80 text-sm">Start earning with live selling</p>
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white/10 rounded-xl p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <i className={`${benefit.icon} text-yellow-400 text-sm`}></i>
                    <span className="text-sm font-semibold">{benefit.title}</span>
                  </div>
                  <p className="text-xs text-white/70">{benefit.description}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={handleStartSelling}
                className="flex-1 bg-yellow-400 text-[#072415] py-3 px-4 rounded-xl font-bold text-sm hover:bg-yellow-300 transition-colors"
              >
                Start Selling
              </button>
              <button className="px-4 py-3 border border-white/30 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Seller Setup Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Complete Seller Setup</h3>
                  <p className="text-sm text-gray-600">Step {currentStep + 1} of {setupSteps.length}</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                >
                  <i className="ri-close-line text-gray-600"></i>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#072415] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / setupSteps.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#072415]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${setupSteps[currentStep].icon} text-[#072415] text-2xl`}></i>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {setupSteps[currentStep].title}
                </h4>
                <p className="text-gray-600">
                  {setupSteps[currentStep].description}
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {setupSteps[currentStep].fields.map((field, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field}
                    </label>
                    {field.includes('Description') ? (
                      <textarea
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#072415]/20 focus:border-[#072415] outline-none resize-none"
                        rows={3}
                        placeholder={`Enter your ${field.toLowerCase()}`}
                      />
                    ) : field.includes('Document') || field.includes('License') ? (
                      <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
                        <i className="ri-upload-cloud-line text-gray-400 text-2xl mb-2"></i>
                        <p className="text-sm text-gray-600">Upload {field}</p>
                        <input type="file" className="hidden" />
                      </div>
                    ) : (
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#072415]/20 focus:border-[#072415] outline-none"
                        placeholder={`Enter your ${field.toLowerCase()}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-100">
              <div className="flex space-x-3">
                {currentStep > 0 && (
                  <button
                    onClick={handlePrevStep}
                    className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                  >
                    Previous
                  </button>
                )}
                <button
                  onClick={handleNextStep}
                  className="flex-1 py-3 px-4 bg-[#072415] text-white rounded-xl font-medium hover:bg-[#072415]/90 transition-colors"
                >
                  {currentStep === setupSteps.length - 1 ? 'Complete Setup' : 'Continue'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
