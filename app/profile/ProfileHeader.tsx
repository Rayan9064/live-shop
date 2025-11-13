
'use client';

import { useState } from 'react';

export default function ProfileHeader() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="px-4 pt-6">
      {/* Profile Image and Info */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20young%20woman%20with%20shoulder-length%20brown%20hair%2C%20wearing%20a%20white%20blouse%2C%20smiling%20warmly%20at%20camera%2C%20clean%20studio%20lighting%2C%20high-quality%20portrait%20photography%2C%20modern%20professional%20look&width=120&height=120&seq=profile-avatar-001&orientation=squarish"
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#072415] rounded-full flex items-center justify-center shadow-lg">
            <i className="ri-camera-line text-white text-sm"></i>
          </button>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-gray-900" suppressHydrationWarning={true}>
              Sarah Johnson
            </h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-1"
            >
              <i className="ri-edit-2-line text-gray-500 text-sm"></i>
            </button>
          </div>
          <p className="text-gray-600 text-sm mt-1" suppressHydrationWarning={true}>
            sarah.johnson@email.com
          </p>
          <div className="flex items-center mt-2">
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <i key={star} className="ri-star-fill text-yellow-400 text-xs"></i>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-2" suppressHydrationWarning={true}>
              4.9 (127 reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Member Badge */}
      <div className="mt-4 inline-flex items-center px-3 py-1 bg-gradient-to-r from-[#072415] to-[#0a3d1f] rounded-full">
        <i className="ri-vip-crown-line text-yellow-400 text-sm mr-2"></i>
        <span className="text-white text-xs font-medium">Premium Member</span>
      </div>
    </div>
  );
}
