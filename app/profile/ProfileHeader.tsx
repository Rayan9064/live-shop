

'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/providers/AuthProvider';
import { getUserProfile, UserProfile } from '@/lib/userService';

export default function ProfileHeader() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;

      setLoading(true);
      try {
        const userProfile = await getUserProfile(user.uid);
        setProfile(userProfile);
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user]);

  return (
    <div className="px-4 pt-6">
      {/* Profile Image and Info */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          {loading ? (
            <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse"></div>
          ) : (
            <img
              src={profile?.photoURL || "https://readdy.ai/api/search-image?query=Professional%20headshot%20placeholder%2C%20neutral%20avatar%2C%20clean%20studio%20lighting%2C%20high-quality%20portrait%20photography%2C%20modern%20professional%20look&width=120&height=120&seq=profile-avatar-001&orientation=squarish"}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
            />
          )}
          <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#072415] rounded-full flex items-center justify-center shadow-lg">
            <i className="ri-camera-line text-white text-sm"></i>
          </button>
        </div>

        <div className="flex-1">
          <div className="flex items-center space-x-2">
            {loading ? (
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
            ) : (
              <h2 className="text-xl font-bold text-gray-900" suppressHydrationWarning={true}>
                {profile?.displayName || 'User'}
              </h2>
            )}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-1"
            >
              <i className="ri-edit-2-line text-gray-500 text-sm"></i>
            </button>
          </div>
          {loading ? (
            <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mt-1"></div>
          ) : (
            <p className="text-gray-600 text-sm mt-1" suppressHydrationWarning={true}>
              {profile?.email || user?.email || 'No email'}
            </p>
          )}
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
