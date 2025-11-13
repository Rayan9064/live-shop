'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NotificationsPage() {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    promotions: true,
    newFollowers: true,
    liveStreams: true,
    messages: true,
    weeklyDigest: false
  });

  const toggleSetting = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center space-x-3">
          <Link href="/profile">
            <i className="ri-arrow-left-line text-xl text-gray-700"></i>
          </Link>
          <h1 className="text-lg font-bold text-gray-900">Notifications</h1>
        </div>
      </div>

      {/* Content */}
      <div className="pt-16 pb-20 px-4">
        <div className="space-y-6">
          {/* Notification Methods */}
          <div className="bg-white rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-4">Notification Methods</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <i className="ri-notification-line text-lg text-gray-600"></i>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Push Notifications</p>
                    <p className="text-xs text-gray-500">Receive notifications on your device</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting('pushNotifications')}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.pushNotifications ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.pushNotifications ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <i className="ri-mail-line text-lg text-gray-600"></i>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                    <p className="text-xs text-gray-500">Receive updates via email</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting('emailNotifications')}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.emailNotifications ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.emailNotifications ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <i className="ri-message-line text-lg text-gray-600"></i>
                  <div>
                    <p className="text-sm font-medium text-gray-900">SMS Notifications</p>
                    <p className="text-xs text-gray-500">Receive text messages</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting('smsNotifications')}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.smsNotifications ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.smsNotifications ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Shopping Notifications */}
          <div className="bg-white rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-4">Shopping</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Order Updates</p>
                  <p className="text-xs text-gray-500">Shipping, delivery & order status</p>
                </div>
                <button
                  onClick={() => toggleSetting('orderUpdates')}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.orderUpdates ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.orderUpdates ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Promotions & Deals</p>
                  <p className="text-xs text-gray-500">Special offers and discounts</p>
                </div>
                <button
                  onClick={() => toggleSetting('promotions')}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.promotions ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.promotions ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Social Notifications */}
          <div className="bg-white rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-4">Social</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">New Followers</p>
                  <p className="text-xs text-gray-500">When someone follows you</p>
                </div>
                <button
                  onClick={() => toggleSetting('newFollowers')}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.newFollowers ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.newFollowers ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Live Streams</p>
                  <p className="text-xs text-gray-500">When people you follow go live</p>
                </div>
                <button
                  onClick={() => toggleSetting('liveStreams')}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.liveStreams ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.liveStreams ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Messages</p>
                  <p className="text-xs text-gray-500">Direct messages and replies</p>
                </div>
                <button
                  onClick={() => toggleSetting('messages')}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.messages ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.messages ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Digest */}
          <div className="bg-white rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-4">Digest</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Weekly Digest</p>
                <p className="text-xs text-gray-500">Summary of your activity and updates</p>
              </div>
              <button
                onClick={() => toggleSetting('weeklyDigest')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.weeklyDigest ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.weeklyDigest ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}