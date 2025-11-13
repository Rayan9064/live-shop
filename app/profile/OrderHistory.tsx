
'use client';

import { useState } from 'react';

export default function OrderHistory() {
  const [filter, setFilter] = useState('all');

  const orders = [
    {
      id: '#ORD-2024-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 89.99,
      items: 3,
      image: 'https://readdy.ai/api/search-image?query=Modern%20wireless%20headphones%20in%20sleek%20black%20color%2C%20premium%20design%2C%20studio%20lighting%2C%20product%20photography%2C%20clean%20white%20background%2C%20high-quality%20details&width=80&height=80&seq=order-item-001&orientation=squarish'
    },
    {
      id: '#ORD-2024-002',
      date: '2024-01-12',
      status: 'shipped',
      total: 156.50,
      items: 2,
      image: 'https://readdy.ai/api/search-image?query=Elegant%20smartwatch%20with%20black%20metal%20band%2C%20modern%20design%2C%20premium%20materials%2C%20studio%20lighting%2C%20product%20photography%2C%20clean%20white%20background&width=80&height=80&seq=order-item-002&orientation=squarish'
    },
    {
      id: '#ORD-2024-003',
      date: '2024-01-08',
      status: 'processing',
      total: 45.00,
      items: 1,
      image: 'https://readdy.ai/api/search-image?query=Premium%20skincare%20serum%20bottle%2C%20elegant%20glass%20container%2C%20luxury%20cosmetics%2C%20studio%20lighting%2C%20product%20photography%2C%20clean%20white%20background&width=80&height=80&seq=order-item-003&orientation=squarish'
    },
    {
      id: '#ORD-2024-004',
      date: '2024-01-05',
      status: 'delivered',
      total: 234.99,
      items: 4,
      image: 'https://readdy.ai/api/search-image?query=Stylish%20crossbody%20bag%20in%20brown%20leather%2C%20premium%20fashion%20accessory%2C%20studio%20lighting%2C%20product%20photography%2C%20clean%20white%20background&width=80&height=80&seq=order-item-004&orientation=squarish'
    },
    {
      id: '#ORD-2024-005',
      date: '2024-01-02',
      status: 'cancelled',
      total: 67.50,
      items: 2,
      image: 'https://readdy.ai/api/search-image?query=Modern%20desk%20lamp%20with%20adjustable%20arm%2C%20minimalist%20design%2C%20home%20office%20lighting%2C%20studio%20photography%2C%20clean%20white%20background&width=80&height=80&seq=order-item-005&orientation=squarish'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-50';
      case 'shipped': return 'text-blue-600 bg-blue-50';
      case 'processing': return 'text-yellow-600 bg-yellow-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredOrders = filter === 'all' ? orders : orders.filter(order => order.status === filter);

  return (
    <div className="px-4">
      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {['all', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              filter === status
                ? 'bg-[#072415] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-3">
              <img
                src={order.image}
                alt="Order item"
                className="w-16 h-16 rounded-xl object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900" suppressHydrationWarning={true}>
                      {order.id}
                    </h3>
                    <p className="text-sm text-gray-500" suppressHydrationWarning={true}>
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600" suppressHydrationWarning={true}>
                      {order.items} item{order.items > 1 ? 's' : ''}
                    </span>
                    <span className="text-lg font-bold text-[#072415]" suppressHydrationWarning={true}>
                      ${order.total}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                      View Details
                    </button>
                    {order.status === 'delivered' && (
                      <button className="px-3 py-1 bg-[#072415] text-white rounded-lg text-sm font-medium hover:bg-[#0a3d1f] transition-colors">
                        Reorder
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-shopping-bag-line text-gray-400 text-2xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Orders Found</h3>
          <p className="text-gray-600">You don't have any orders with this status yet.</p>
        </div>
      )}
    </div>
  );
}
