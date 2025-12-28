'use client';

import { useState } from 'react';
import { useAuth } from '@/app/providers/AuthProvider';
import Link from 'next/link';

export default function PasswordResetPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await resetPassword(email);
      setSuccess('Password reset email sent! Check your inbox.');
      setEmail('');
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Back Button */}
      <div className="flex justify-start p-6">
        <Link href="/signin" className="bg-gray-100 hover:bg-gray-200 transition-colors px-6 py-3 rounded-full text-gray-700 font-medium">
          <i className="ri-arrow-left-line mr-1"></i>Back
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-8 pb-20">
        {/* Logo and Title */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-['Pacifico'] text-black mb-6">Orian</h1>
          <div className="space-y-2">
            <p className="text-xl text-gray-800 font-medium">Reset your password</p>
            <p className="text-sm text-gray-600">Enter your email and we'll send you a reset link</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleResetPassword} className="space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="rounded-md bg-green-50 p-4">
              <p className="text-sm text-green-700">{success}</p>
            </div>
          )}

          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-black focus:outline-none transition-colors bg-white"
            />
          </div>

          {/* Reset Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-2xl text-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Sending...
              </div>
            ) : (
              'Send Reset Link'
            )}
          </button>

          <p className="text-center text-gray-600">
            Remember your password?{' '}
            <Link href="/signin" className="font-medium text-black hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
