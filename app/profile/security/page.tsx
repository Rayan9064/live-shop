'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SecurityPage() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center space-x-3">
          <Link href="/profile">
            <i className="ri-arrow-left-line text-xl text-gray-700"></i>
          </Link>
          <h1 className="text-lg font-bold text-gray-900">Security & Privacy</h1>
        </div>
      </div>

      {/* Content */}
      <div className="pt-16 pb-20 px-4">
        <div className="space-y-6">
          {/* Password Section */}
          <div className="bg-white rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-4">Password</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900">Password</p>
                <p className="text-xs text-gray-500">Last changed 3 months ago</p>
              </div>
              <button
                onClick={() => setShowChangePassword(true)}
                className="text-sm font-medium"
                style={{ color: '#072415' }}
              >
                Change
              </button>
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="bg-white rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-4">Two-Factor Authentication</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900">2FA Protection</p>
                <p className="text-xs text-gray-500">Add extra security to your account</p>
              </div>
              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  twoFactorEnabled ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    twoFactorEnabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Biometric Login */}
          <div className="bg-white rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-4">Biometric Login</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900">Face ID / Fingerprint</p>
                <p className="text-xs text-gray-500">Use biometrics to sign in</p>
              </div>
              <button
                onClick={() => setBiometricEnabled(!biometricEnabled)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  biometricEnabled ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    biometricEnabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-4">Privacy</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-900">Profile Visibility</span>
                <select className="text-sm border border-gray-200 rounded-lg px-3 py-1">
                  <option>Public</option>
                  <option>Friends Only</option>
                  <option>Private</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-900">Activity Status</span>
                <select className="text-sm border border-gray-200 rounded-lg px-3 py-1">
                  <option>Everyone</option>
                  <option>Friends Only</option>
                  <option>Nobody</option>
                </select>
              </div>
            </div>
          </div>

          {/* Login Activity */}
          <div className="bg-white rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-4">Recent Login Activity</h3>
            <div className="space-y-3">
              {[
                { device: 'iPhone 14 Pro', location: 'New York, NY', time: '2 hours ago', current: true },
                { device: 'MacBook Pro', location: 'New York, NY', time: '1 day ago', current: false },
                { device: 'iPad Air', location: 'Boston, MA', time: '3 days ago', current: false }
              ].map((session, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <i className={`${session.device.includes('iPhone') ? 'ri-smartphone-line' : 
                        session.device.includes('MacBook') ? 'ri-macbook-line' : 'ri-tablet-line'} text-sm`}></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{session.device}</p>
                      <p className="text-xs text-gray-500">{session.location} • {session.time}</p>
                    </div>
                  </div>
                  {session.current && (
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Current</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Change Password</h3>
            <div className="space-y-4">
              <input
                type="password"
                placeholder="Current Password"
                className="w-full p-3 border border-gray-200 rounded-xl text-sm"
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full p-3 border border-gray-200 rounded-xl text-sm"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full p-3 border border-gray-200 rounded-xl text-sm"
              />
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowChangePassword(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowChangePassword(false)}
                className="flex-1 py-3 text-white rounded-xl font-medium"
                style={{ backgroundColor: '#072415' }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}