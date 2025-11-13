'use client';

import { useState } from 'react';
import Link from 'next/link';
import BottomTabBar from '../../../components/BottomTabBar';

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);

  const tabs = ['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'];

  const orders = [
    {
      id: 1,
      orderNumber: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 129.99,
      items: 3,
      image: 'https://readdy.ai/api/search-image?query=Wireless%20bluetooth%20headphones%20product%20package%2C%20delivered%20order%2C%20professional%20product%20photography%2C%20isolated%20on%20white%20background%2C%20high%20detail%2C%20minimalist%20composition&width=80&height=80&seq=1&orientation=squarish',
      trackingNumber: 'TRK123456789',
      estimatedDelivery: 'Delivered on Jan 18, 2024'
    },
    {
      id: 2,
      orderNumber: 'ORD-2024-002',
      date: '2024-01-20',
      status: 'Shipped',
      total: 89.99,
      items: 2,
      image: 'https://readdy.ai/api/search-image?query=Summer%20fashion%20dress%20package%2C%20shipping%20box%2C%20professional%20product%20photography%2C%20isolated%20on%20white%20background%2C%20high%20detail%2C%20minimalist%20composition&width=80&height=80&seq=2&orientation=squarish',
      trackingNumber: 'TRK987654321',
      estimatedDelivery: 'Expected Jan 25, 2024'
    },
    {
      id: 3,
      orderNumber: 'ORD-2024-003',
      date: '2024-01-22',
      status: 'Pending',
      total: 199.99,
      items: 1,
      image: 'https://readdy.ai/api/search-image?query=Smart%20fitness%20watch%20package%2C%20pending%20order%2C%20professional%20product%20photography%2C%20isolated%20on%20white%20background%2C%20high%20detail%2C%20minimalist%20composition&width=80&height=80&seq=3&orientation=squarish',
      trackingNumber: 'Processing',
      estimatedDelivery: 'Expected Jan 28, 2024'
    },
    {
      id: 4,
      orderNumber: 'ORD-2024-004',
      date: '2024-01-10',
      status: 'Cancelled',
      total: 45.99,
      items: 1,
      image: 'https://readdy.ai/api/search-image?query=Organic%20face%20serum%20package%2C%20cancelled%20order%2C%20professional%20product%20photography%2C%20isolated%20on%20white%20background%2C%20high%20detail%2C%20minimalist%20composition&width=80&height=80&seq=4&orientation=squarish',
      trackingNumber: 'Cancelled',
      estimatedDelivery: 'Order cancelled'
    },
    {
      id: 5,
      orderNumber: 'ORD-2024-005',
      date: '2024-01-25',
      status: 'Shipped',
      total: 79.99,
      items: 2,
      image: 'https://readdy.ai/api/search-image?query=Running%20sneakers%20package%2C%20shipping%20box%2C%20professional%20product%20photography%2C%20isolated%20on%20white%20background%2C%20high%20detail%2C%20minimalist%20composition&width=80&height=80&seq=5&orientation=squarish',
      trackingNumber: 'TRK456789123',
      estimatedDelivery: 'Expected Jan 30, 2024'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'text-green-600 bg-green-50';
      case 'Shipped': return 'text-blue-600 bg-blue-50';
      case 'Pending': return 'text-yellow-600 bg-yellow-50';
      case 'Cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredOrders = activeTab === 'All' 
    ? orders 
    : orders.filter(order => order.status === activeTab);

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
            <h1 className="text-xl font-bold text-gray-900">My Orders</h1>
          </div>
          <button className="w-10 h-10 flex items-center justify-center">
            <i className="ri-search-line text-xl text-gray-700"></i>
          </button>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="px-4 py-4 pb-20">
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{order.orderNumber}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                <div className="flex items-center space-x-3 mb-3">
                  <img 
                    src={order.image}
                    alt="Order item"
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">{order.items} item{order.items > 1 ? 's' : ''}</p>
                    <p className="text-lg font-bold text-gray-900">${order.total}</p>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Tracking: {order.trackingNumber}</span>
                    <button 
                      onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                      className="text-gray-900 font-medium"
                    >
                      {selectedOrder === order.id ? 'Hide Details' : 'View Details'}
                    </button>
                  </div>
                  
                  {selectedOrder === order.id && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-sm text-gray-600 mb-2">{order.estimatedDelivery}</p>
                      <div className="flex space-x-2">
                        {order.status === 'Shipped' && (
                          <button className="flex-1 bg-gray-900 text-white py-2 rounded-lg text-sm font-medium">
                            Track Package
                          </button>
                        )}
                        {order.status === 'Delivered' && (
                          <>
                            <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium">
                              Reorder
                            </button>
                            <button className="flex-1 bg-gray-900 text-white py-2 rounded-lg text-sm font-medium">
                              Write Review
                            </button>
                          </>
                        )}
                        {order.status === 'Pending' && (
                          <button className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm font-medium">
                            Cancel Order
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-file-list-line text-gray-400 text-3xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No {activeTab.toLowerCase()} orders</h3>
            <p className="text-gray-500 mb-6">You don't have any {activeTab.toLowerCase()} orders yet.</p>
            <Link href="/shop">
              <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium">
                Start Shopping
              </button>
            </Link>
          </div>
        )}
      </div>

      <BottomTabBar />
    </div>
  );
}