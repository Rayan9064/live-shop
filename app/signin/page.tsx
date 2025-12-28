'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/providers/AuthProvider';
import Link from 'next/link';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signin, signInWithGoogle } = useAuth();

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signin(email, password);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      const { needsOnboarding } = await signInWithGoogle();
      // Use window.location for more reliable redirects
      if (needsOnboarding) {
        window.location.href = '/onboarding';
      } else {
        window.location.href = '/';
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Back Button */}
      <div className="flex justify-start p-6">
        <Link href="/" className="bg-gray-100 hover:bg-gray-200 transition-colors px-6 py-3 rounded-full text-gray-700 font-medium">
          <i className="ri-arrow-left-line mr-1"></i>Back
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-8 pb-20">
        {/* Logo and Title */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-['Pacifico'] text-black mb-6">Orian</h1>
          <div className="space-y-2">
            <p className="text-xl text-gray-800 font-medium">Welcome back!</p>
            <p className="text-sm text-gray-600">Sign in to continue shopping</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSignin} className="space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
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

          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-black focus:outline-none transition-colors bg-white"
            />
          </div>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-white border-2 border-gray-200 text-gray-700 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-2xl text-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </button>

          <div className="flex flex-col gap-4">
            <Link href="/password-reset" className="text-center text-gray-600 hover:text-black text-sm">
              Forgot password?
            </Link>
            <p className="text-center text-gray-600">
              Don't have an account?{' '}
              <Link href="/signup" className="font-medium text-black hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
