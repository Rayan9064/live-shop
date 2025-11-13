'use client';

import { useState } from 'react';
import Link from 'next/link';
import BottomTabBar from '../../../components/BottomTabBar';

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);

  const tabs = ['All', 'Unread', 'Orders', 'Support'];

  const messages = [
    {
      id: 1,
      type: 'order',
      sender: 'Orion Shop',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20customer%20service%20avatar%2C%20friendly%20support%20representative%2C%20business%20profile%20photo%2C%20isolated%20on%20white%20background%2C%20high%20detail%2C%20minimalist%20composition&width=50&height=50&seq=1&orientation=squarish',
      subject: 'Your order has been shipped!',
      preview: 'Order #ORD-2024-002 is on its way. Track your package...',
      time: '2 hours ago',
      isRead: false,
      isImportant: true
    },
    {
      id: 2,
      type: 'support',
      sender: 'Customer Support',
      avatar: 'https://readdy.ai/api/search-image?query=Customer%20support%20team%20avatar%2C%20professional%20help%20desk%20representative%2C%20business%20profile%20photo%2C%20isolated%20on%20white%20background%2C%20high%20detail%2C%20minimalist%20composition&width=50&height=50&seq=2&orientation=squarish',
      subject: 'Return request approved',
      preview: 'Your return request for Wireless Headphones has been approved...',
      time: '1 day ago',
      isRead: true,
      isImportant: false
    },
    {
      id: 3,
      type: 'promotion',
      sender: 'Orion Shop',
      avatar: 'https://readdy.ai/api/search-image?query=Shopping%20promotion%20avatar%2C%20retail%20marketing%20representative%2C%20business%20profile%20photo%2C%20isolated%20on%20white%20background%2C%20high%20detail%2C%20minimalist%20composition&width=50&height=50&seq=3&orientation=squarish',
      subject: 'Special offer just for you!',
      preview: '20% off on all electronics. Limited time offer ending soon...',
      time: '2 days ago',
      isRead: true,
      isImportant: false
    },
    {
      id: 4,
      type: 'order',
      sender: 'Delivery Team',
      avatar: 'https://readdy.ai/api/search-image?query=Delivery%20team%20avatar%2C%20professional%20courier%20representative%2C%20business%20profile%20photo%2C%20isolated%20on%20white%20background%2C%20high%20detail%2C%20minimalist%20composition&width=50&height=50&seq=4&orientation=squarish',
      subject: 'Delivery attempt failed',
      preview: 'We attempted to deliver your package but no one was home...',
      time: '3 days ago',
      isRead: false,
      isImportant: true
    },
    {
      id: 5,
      type: 'support',
      sender: 'Technical Support',
      avatar: 'https://readdy.ai/api/search-image?query=Technical%20support%20avatar%2C%20IT%20help%20desk%20representative%2C%20business%20profile%20photo%2C%20isolated%20on%20white%20background%2C%20high%20detail%2C%20minimalist%20composition&width=50&height=50&seq=5&orientation=squarish',
      subject: 'Account security update',
      preview: 'Your account security settings have been updated successfully...',
      time: '1 week ago',
      isRead: true,
      isImportant: false
    },
    {
      id: 6,
      type: 'order',
      sender: 'Orion Shop',
      avatar: 'https://readdy.ai/api/search-image?query=Order%20confirmation%20avatar%2C%20retail%20sales%20representative%2C%20business%20profile%20photo%2C%20isolated%20on%20white%20background%2C%20high%20detail%2C%20minimalist%20composition&width=50&height=50&seq=6&orientation=squarish',
      subject: 'Order confirmation',
      preview: 'Thank you for your order! Order #ORD-2024-005 confirmed...',
      time: '1 week ago',
      isRead: true,
      isImportant: false
    }
  ];

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'order': return 'ri-shopping-bag-line';
      case 'support': return 'ri-customer-service-line';
      case 'promotion': return 'ri-gift-line';
      default: return 'ri-message-line';
    }
  };

  const filteredMessages = messages.filter(message => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Unread') return !message.isRead;
    if (activeTab === 'Orders') return message.type === 'order';
    if (activeTab === 'Support') return message.type === 'support';
    return true;
  });

  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/shop">
              <button className="w-10 h-10 flex items-center justify-center mr-3">
                <i className="ri-arrow-left-line text-xl text-gray-700"></i>
              </button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Messages</h1>
              {unreadCount > 0 && (
                <p className="text-sm text-gray-500">{unreadCount} unread message{unreadCount > 1 ? 's' : ''}</p>
              )}
            </div>
          </div>
          <button className="w-10 h-10 flex items-center justify-center">
            <i className="ri-search-line text-xl text-gray-700"></i>
          </button>
        </div>
      </div>

      {/* Message Tabs */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap relative ${
                activeTab === tab
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {tab}
              {tab === 'Unread' && unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Messages List */}
      <div className="pb-20">
        {filteredMessages.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredMessages.map((message) => (
              <div 
                key={message.id} 
                className={`px-4 py-4 hover:bg-gray-50 cursor-pointer ${!message.isRead ? 'bg-blue-50' : ''}`}
                onClick={() => setSelectedMessage(selectedMessage === message.id ? null : message.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <img 
                      src={message.avatar}
                      alt={message.sender}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${
                      message.type === 'order' ? 'bg-green-500' :
                      message.type === 'support' ? 'bg-blue-500' :
                      'bg-purple-500'
                    }`}>
                      <i className={`${getMessageIcon(message.type)} text-white text-xs`}></i>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <p className={`text-sm font-medium ${!message.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                          {message.sender}
                        </p>
                        {message.isImportant && (
                          <i className="ri-star-fill text-yellow-400 text-xs"></i>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{message.time}</p>
                    </div>
                    
                    <h3 className={`text-sm mb-1 ${!message.isRead ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                      {message.subject}
                    </h3>
                    
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {message.preview}
                    </p>
                    
                    {!message.isRead && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    )}
                  </div>
                </div>

                {selectedMessage === message.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-700 mb-4">
                        {message.type === 'order' && 'Your order is being processed and will be shipped soon. You will receive tracking information once the package is dispatched.'}
                        {message.type === 'support' && 'Our support team has reviewed your request and taken the necessary actions. If you have any questions, please don\'t hesitate to contact us.'}
                        {message.type === 'promotion' && 'Don\'t miss out on this exclusive offer! Use code SAVE20 at checkout to get 20% off on all electronics. Offer valid until the end of this month.'}
                      </p>
                      
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-gray-900 text-white py-2 rounded-lg text-sm font-medium">
                          Reply
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium">
                          Mark as Read
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-message-line text-gray-400 text-3xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No messages</h3>
            <p className="text-gray-500 mb-6">You don't have any {activeTab.toLowerCase()} messages yet.</p>
            <Link href="/shop">
              <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium">
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
      </div>

      <BottomTabBar />
    </div>
  );
}