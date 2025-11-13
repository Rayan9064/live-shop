
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SignUpPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (!phoneNumber.trim()) return;
    
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to next step or home
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Skip Button */}
      <div className="flex justify-end p-6">
        <Link href="/" className="bg-gray-100 hover:bg-gray-200 transition-colors px-6 py-3 rounded-full text-gray-700 font-medium">
          Skip <i className="ri-arrow-right-line ml-1"></i>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-8 pb-20">
        {/* Logo and Title */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-['Pacifico'] text-black mb-6">Orian</h1>
          <div className="space-y-2">
            <p className="text-xl text-gray-800 font-medium">Experience Live Shopping.</p>
            <p className="text-xl text-gray-800 font-medium">Curated Finds.</p>
          </div>
        </div>

        {/* Phone Input */}
        <div className="space-y-6">
          <div className="relative">
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter Phone Number"
              className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-black focus:outline-none transition-colors bg-white"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg pointer-events-none">
              +91
            </span>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter Phone Number"
              className="w-full pl-16 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-black focus:outline-none transition-colors bg-white"
            />
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!phoneNumber.trim() || isLoading}
            className="w-full bg-black text-white py-4 rounded-2xl text-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Loading...
              </div>
            ) : (
              'Continue'
            )}
          </button>
        </div>

        {/* Terms */}
        <p className="text-center text-sm text-gray-500 mt-8 leading-relaxed">
          By continuing, you agree to our{' '}
          <Link href="/terms" className="text-black underline">
            Terms of Use
          </Link>
          {' '}&{' '}
          <Link href="/privacy" className="text-black underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
