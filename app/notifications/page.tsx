
'use client';

import Link from 'next/link';
import { useState } from 'react';

const notificationsData = [
  {
    id: 1,
    type: 'order',
    title: 'Order Shipped',
    message: 'Your order #12345 has been shipped and is on the way!',
    time: '2 hours ago',
    read: false,
    icon: 'ri-truck-line',
    color: 'bg-blue-500'
  },
  {
    id: 2,
    type: 'promotion',
    title: 'Flash Sale Alert',
    message: '50% off on all electronics! Limited time offer.',
    time: '4 hours ago',
    read: false,
    icon: 'ri-fire-line',
    color: 'bg-red-500'
  },
  {
    id: 3,
    type: 'wishlist',
    title: 'Price Drop Alert',
    message: 'Wireless Earbuds in your wishlist is now 30% off!',
    time: '6 hours ago',
    read: true,
    icon: 'ri-heart-line',
    color: 'bg-pink-500'
  },
  {
    id: 4,
    type: 'order',
    title: 'Order Delivered',
    message: 'Your order #12344 has been delivered successfully.',
    time: '1 day ago',
    read: true,
    icon: 'ri-checkbox-circle-line',
    color: 'bg-green-500'
  },
  {
    id: 5,
    type: 'live',
    title: 'Live Stream Starting',
    message: 'TechStore is going live with new product launches!',
    time: '1 day ago',
    read: true,
    icon: 'ri-live-line',
    color: 'bg-purple-500'
  },
  {
    id: 6,
    type: 'review',
    title: 'Review Reminder',
    message: 'How was your recent purchase? Leave a review!',
    time: '2 days ago',
    read: true,
    icon: 'ri-star-line',
    color: 'bg-yellow-500'
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(notificationsData);
  const [filter, setFilter] = useState('all');

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'orders') return notif.type === 'order';
    if (filter === 'promotions') return notif.type === 'promotion';
    return true;
  });

  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <i className="ri-arrow-left-line text-xl text-gray-700"></i>
            </Link>
            <h1 className="text-lg font-bold text-gray-900">Notifications</h1>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm font-medium"
              style={{ color: '#072415' }}
            >
              Mark all read
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <div className="flex space-x-6">
          {[
            { key: 'all', label: 'All', count: notifications.length },
            { key: 'unread', label: 'Unread', count: unreadCount },
            { key: 'orders', label: 'Orders', count: notifications.filter(n => n.type === 'order').length },
            { key: 'promotions', label: 'Promotions', count: notifications.filter(n => n.type === 'promotion').length }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`text-sm font-medium pb-2 border-b-2 ${
                filter === tab.key
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="px-4 py-4 space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <i className="ri-notification-off-line text-4xl text-gray-300 mb-3"></i>
            <p className="text-gray-500">No notifications found</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-xl p-4 shadow-sm ${
                !notification.read ? 'border-l-4 border-green-500' : ''
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${notification.color}`}>
                  <i className={`${notification.icon} text-white text-lg`}></i>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`font-medium text-sm ${
                        !notification.read ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {notification.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                      <p className="text-gray-400 text-xs mt-2">{notification.time}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <i className="ri-close-line text-sm"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-4">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/shop/orders">
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <i className="ri-truck-line text-2xl text-blue-500 mb-2"></i>
              <p className="text-sm font-medium text-gray-900">Track Orders</p>
            </div>
          </Link>
          <Link href="/shop/favorites">
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <i className="ri-heart-line text-2xl text-pink-500 mb-2"></i>
              <p className="text-sm font-medium text-gray-900">Wishlist</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
