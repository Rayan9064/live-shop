'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/providers/AuthProvider';

/**
 * withProtectedRoute wraps a component to require authentication
 * Redirects to /signin if user is not authenticated
 */
export function withProtectedRoute<P extends object>(
  Component: React.ComponentType<P>,
  options?: { redirectTo?: string }
) {
  return function ProtectedComponent(props: P) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const redirectTo = options?.redirectTo || '/signin';

    useEffect(() => {
      if (!loading && !user) {
        router.push(redirectTo);
      }
    }, [user, loading, router, redirectTo]);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    if (!user) {
      return null;
    }

    return <Component {...props} />;
  };
}

/**
 * useProtectedRoute hook to check auth in a page
 * Returns redirect if user is not authenticated
 */
export function useProtectedRoute(redirectTo: string = '/signin') {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push(redirectTo);
    }
  }, [user, loading, router, redirectTo]);

  return { user, loading, isProtected: !loading && !!user };
}
