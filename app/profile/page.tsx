
'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProfileHeader from './ProfileHeader';
import ProfileMenu from './ProfileMenu';
import SellerOnboarding from './SellerOnboarding';
import BottomTabBar from '../../components/BottomTabBar';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Content */}
      <div className="pt-4 pb-20">
        <ProfileHeader />
        
        {/* Seller Onboarding Section */}
        <div className="mt-6">
          <SellerOnboarding />
        </div>
        
        {/* Main Content */}
        <div className="mt-6">
          <ProfileMenu />
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomTabBar />
    </div>
  );
}
