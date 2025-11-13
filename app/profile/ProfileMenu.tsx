
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProfileMenu() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    {
      title: 'Account Settings',
      items: [
        { icon: 'ri-user-line', label: 'Personal Information', href: '/profile/personal' },
        { icon: 'ri-lock-line', label: 'Security & Privacy', href: '/profile/security' },
        { icon: 'ri-notification-line', label: 'Notifications', href: '/profile/notifications' },
        { icon: 'ri-bank-card-line', label: 'Payment Methods', href: '/profile/payment' }
      ]
    },
    {
      title: 'Shopping',
      items: [
        { icon: 'ri-map-pin-line', label: 'Addresses', href: '/profile/addresses' },
        { icon: 'ri-customer-service-line', label: 'Customer Support', href: '/profile/support' }
      ]
    }
  ];

  return (
    <div className="px-4">
      {menuItems.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            {section.title}
          </h3>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {section.items.map((item, itemIndex) => (
              <Link
                key={itemIndex}
                href={item.href}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <i className={`${item.icon} text-[#072415] text-lg`}></i>
                  </div>
                  <span className="text-gray-900 font-medium">{item.label}</span>
                </div>
                <i className="ri-arrow-right-s-line text-gray-400"></i>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {/* Sign Out */}
      <div className="px-4 mt-6">
        <button className="w-full flex items-center justify-center py-3 px-4 rounded-lg border-2 transition-colors" style={{ backgroundColor: '#072415', borderColor: '#072415' }}>
          <i className="ri-logout-box-line text-white text-lg mr-3"></i>
          <span className="text-white font-medium">Sign Out</span>
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-logout-box-line text-red-600 text-2xl"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Sign Out</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to sign out of your account?</p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 py-3 px-4 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
