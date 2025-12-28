'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/providers/AuthProvider';
import { getUserProfile, updateUserProfile } from '@/lib/userService';

export default function PersonalInformationPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadUserData() {
      if (!user) return;

      setLoading(true);
      try {
        const profile = await getUserProfile(user.uid);
        if (profile) {
          // Split displayName into first and last name
          const nameParts = (profile.displayName || '').split(' ');
          const firstName = nameParts[0] || '';
          const lastName = nameParts.slice(1).join(' ') || '';

          setFormData({
            firstName,
            lastName,
            email: profile.email || '',
            phone: profile.phone || '',
            dateOfBirth: profile.dateOfBirth || '',
            gender: profile.gender || ''
          });
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
      } finally {
        setLoading(false);
      }
    }

    loadUserData();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const displayName = `${formData.firstName} ${formData.lastName}`.trim();
      await updateUserProfile(user.uid, {
        displayName,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/profile">
              <i className="ri-arrow-left-line text-xl text-gray-700"></i>
            </Link>
            <h1 className="text-lg font-bold text-gray-900">Personal Information</h1>
          </div>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            disabled={saving}
            className="text-sm font-medium disabled:opacity-50"
            style={{ color: '#072415' }}
          >
            {saving ? 'Saving...' : isEditing ? 'Save' : 'Edit'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="pt-16 pb-20 px-4">
        <div className="space-y-6">
          {/* Profile Photo */}
          <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src="https://readdy.ai/api/search-image?query=Professional%20woman%20portrait%2C%20friendly%20smile%2C%20business%20casual%2C%20clean%20background%2C%20headshot%20photography%20style%2C%20high%20quality&width=80&height=80&seq=profile-photo&orientation=squarish"
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
                {isEditing && (
                  <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                    <i className="ri-camera-line text-white text-xs"></i>
                  </button>
                )}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{formData.firstName} {formData.lastName}</h3>
                <p className="text-sm text-gray-500">Member since 2023</p>
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div className="bg-white rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-4">Personal Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    disabled={!isEditing}
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    disabled={!isEditing}
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm disabled:bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500 mb-1 block">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500 mb-1 block">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500 mb-1 block">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500 mb-1 block">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm disabled:bg-gray-50"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}