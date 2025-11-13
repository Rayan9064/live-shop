'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SellerHeaderProps {
  sellerId: string;
}

export default function SellerHeader({ sellerId }: SellerHeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/shop" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
          <div className="w-5 h-5 flex items-center justify-center">
            <i className="ri-arrow-left-line text-gray-700"></i>
          </div>
        </Link>
        
        <h1 className="font-semibold text-gray-900">Seller Profile</h1>
        
        <div className="flex items-center space-x-2">
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-share-line text-gray-700"></i>
            </div>
          </button>
          
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-more-line text-gray-700"></i>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}