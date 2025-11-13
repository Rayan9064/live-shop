
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function TopNavigation() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="relative">
              <div className="w-full bg-gray-100 rounded-full px-4 py-2 pr-10 text-sm h-9"></div>
            </div>
          </div>
          <div className="flex items-center space-x-4 ml-4">
            <div className="w-6 h-6"></div>
            <div className="w-6 h-6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="relative">
            <Link href="/search">
              <input
                type="text"
                placeholder="Search live streams & products"
                className="w-full bg-gray-100 rounded-full px-4 py-2 pr-10 text-sm border-none focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#072415' } as any}
                readOnly
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                <i className="ri-search-line text-gray-400 text-lg"></i>
              </div>
            </Link>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 ml-4">
          <Link href="/cart" className="relative">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-shopping-cart-line text-gray-700 text-xl"></i>
            </div>
            <div className="absolute -top-1 -right-1 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center" style={{ backgroundColor: '#072415' }}>
              3
            </div>
          </Link>
          
          <Link href="/notifications" className="relative">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-notification-line text-gray-700 text-xl"></i>
            </div>
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full" style={{ backgroundColor: '#072415' }}></div>
          </Link>
        </div>
      </div>
    </div>
  );
}
