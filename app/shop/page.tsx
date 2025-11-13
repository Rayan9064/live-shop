
'use client';

import { useState } from 'react';
import Link from 'next/link';
import BottomTabBar from '../../components/BottomTabBar';

const mockActivities = [
  {
    id: 1,
    type: 'purchase',
    status: 'completed',
    title: 'Wireless Earbuds Pro',
    seller: 'TechStore',
    price: 79.99,
    originalPrice: 129.99,
    date: '2024-01-15',
    image: 'Premium wireless earbuds in sleek charging case, modern design, white background, product photography style, high quality, clean aesthetic, technology product',
    orderId: '#ORD-2024-001'
  },
  {
    id: 2,
    type: 'bid',
    status: 'in_progress',
    title: 'Smart Watch Series 5',
    seller: 'WearableTech',
    price: 199.99,
    originalPrice: 299.99,
    date: '2024-01-14',
    image: 'Modern smartwatch with digital display, sleek design, premium materials, product photography, clean white background, high quality, technology accessory',
    bidAmount: 180.00,
    timeLeft: '2h 15m'
  },
  {
    id: 3,
    type: 'offer',
    status: 'pending',
    title: 'Designer Phone Case',
    seller: 'CaseWorld',
    price: 24.99,
    originalPrice: 39.99,
    date: '2024-01-13',
    image: 'Stylish smartphone protective case, modern design, premium materials, product photography style, clean background, mobile accessory, high quality',
    offerAmount: 20.00
  },
  {
    id: 4,
    type: 'saved',
    status: 'active',
    title: 'Bluetooth Speaker',
    seller: 'AudioTech',
    price: 89.99,
    originalPrice: 119.99,
    date: '2024-01-12',
    image: 'Portable bluetooth speaker with premium sound quality, modern design, clean white background, audio device, product photography style, high quality',
    savedDate: '2024-01-12'
  },
  {
    id: 5,
    type: 'purchase',
    status: 'refunded',
    title: 'Gaming Headset',
    seller: 'GameGear',
    price: 59.99,
    originalPrice: 89.99,
    date: '2024-01-10',
    image: 'Professional gaming headset with RGB lighting, comfortable design, gaming accessories, product photography, clean background, high quality',
    orderId: '#ORD-2024-002',
    refundAmount: 59.99
  }
];

export default function ShopPage() {
  const [activeActivityType, setActiveActivityType] = useState('purchases');
  const [activeFilter, setActiveFilter] = useState('all');

  const activityTypes = [
    { id: 'purchases', label: 'Purchases', icon: 'ri-shopping-bag-line' },
    { id: 'bids', label: 'Bids', icon: 'ri-auction-line' },
    { id: 'offers', label: 'Offers', icon: 'ri-price-tag-line' },
    { id: 'saved', label: 'Saved', icon: 'ri-heart-line' }
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'in_progress', label: 'In Progress' },
    { id: 'completed', label: 'Completed' },
    { id: 'refunds', label: 'Refunds' },
    { id: 'cancelled', label: 'Cancelled' }
  ];

  const getFilteredActivities = () => {
    let filtered = mockActivities;

    // Filter by activity type
    if (activeActivityType === 'purchases') {
      filtered = filtered.filter(item => item.type === 'purchase');
    } else if (activeActivityType === 'bids') {
      filtered = filtered.filter(item => item.type === 'bid');
    } else if (activeActivityType === 'offers') {
      filtered = filtered.filter(item => item.type === 'offer');
    } else if (activeActivityType === 'saved') {
      filtered = filtered.filter(item => item.type === 'saved');
    }

    // Filter by status
    if (activeFilter === 'in_progress') {
      filtered = filtered.filter(item => item.status === 'in_progress' || item.status === 'pending');
    } else if (activeFilter === 'completed') {
      filtered = filtered.filter(item => item.status === 'completed' || item.status === 'active');
    } else if (activeFilter === 'refunds') {
      filtered = filtered.filter(item => item.status === 'refunded');
    } else if (activeFilter === 'cancelled') {
      filtered = filtered.filter(item => item.status === 'cancelled');
    }

    return filtered;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'active':
        return 'text-green-600 bg-green-50';
      case 'in_progress':
      case 'pending':
        return 'text-orange-600 bg-orange-50';
      case 'refunded':
        return 'text-blue-600 bg-blue-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (item: any) => {
    if (item.type === 'bid' && item.status === 'in_progress') {
      return `Ends in ${item.timeLeft}`;
    }
    if (item.type === 'offer' && item.status === 'pending') {
      return 'Waiting for response';
    }
    if (item.type === 'saved') {
      return 'Saved item';
    }
    return item.status.charAt(0).toUpperCase() + item.status.slice(1);
  };

  const handleActivityAction = (item: any) => {
    if (item.type === 'purchase' && item.status === 'completed') {
      // Navigate to order details
      console.log('View order details:', item.orderId);
    } else if (item.type === 'bid' && item.status === 'in_progress') {
      // Navigate to bid details
      console.log('View bid details:', item.id);
    } else if (item.type === 'offer' && item.status === 'pending') {
      // Navigate to offer details
      console.log('View offer details:', item.id);
    } else if (item.type === 'saved') {
      // Navigate to product details
      console.log('View saved product:', item.id);
    }
  };

  const filteredActivities = getFilteredActivities();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4">
        <h1 className="text-lg font-bold text-center" style={{ color: '#072415' }}>
          Activity
        </h1>
      </div>

      {/* Activity Type Tabs */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex space-x-1">
          {activityTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveActivityType(type.id)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                activeActivityType === type.id
                  ? 'text-white'
                  : 'text-gray-600 bg-gray-100'
              }`}
              style={activeActivityType === type.id ? { backgroundColor: '#072415' } : {}}
            >
              <div className="flex items-center justify-center space-x-1">
                <i className={`${type.icon} text-sm`}></i>
                <span>{type.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex space-x-2 overflow-x-auto">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === filter.id
                  ? 'text-white'
                  : 'text-gray-600 bg-gray-100'
              }`}
              style={activeFilter === filter.id ? { backgroundColor: '#072415' } : {}}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Activity List */}
      <div className="px-4 py-4">
        {filteredActivities.length > 0 ? (
          <div className="space-y-3">
            {filteredActivities.map((item) => (
              <div
                key={item.id}
                onClick={() => handleActivityAction(item)}
                className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-3">
                  {/* Product Image */}
                  <img
                    src={`https://readdy.ai/api/search-image?query=$%7Bitem.image%7D&width=80&height=80&seq=activity-${item.id}&orientation=squarish`}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-sm">{item.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">by {item.seller}</p>
                        
                        {/* Status Badge */}
                        <div className="mt-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {getStatusText(item)}
                          </span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button className="text-gray-400 hover:text-gray-600">
                        <i className="ri-arrow-right-s-line text-lg"></i>
                      </button>
                    </div>

                    {/* Price and Additional Info */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm" style={{ color: '#072415' }}>
                          ${item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-gray-400 text-xs line-through">
                            ${item.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Additional Info */}
                      <div className="text-right">
                        {item.type === 'bid' && item.bidAmount && (
                          <p className="text-xs text-gray-500">Your bid: ${item.bidAmount}</p>
                        )}
                        {item.type === 'offer' && item.offerAmount && (
                          <p className="text-xs text-gray-500">Your offer: ${item.offerAmount}</p>
                        )}
                        {item.orderId && (
                          <p className="text-xs text-gray-500">{item.orderId}</p>
                        )}
                        <p className="text-xs text-gray-400">{item.date}</p>
                      </div>
                    </div>

                    {/* Action Buttons for specific types */}
                    {item.type === 'bid' && item.status === 'in_progress' && (
                      <div className="flex space-x-2 mt-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Increase bid for:', item.id);
                          }}
                          className="flex-1 py-2 px-3 text-white text-xs font-medium rounded-lg"
                          style={{ backgroundColor: '#072415' }}
                        >
                          Increase Bid
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Withdraw bid for:', item.id);
                          }}
                          className="flex-1 py-2 px-3 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg"
                        >
                          Withdraw
                        </button>
                      </div>
                    )}

                    {item.type === 'saved' && (
                      <div className="flex space-x-2 mt-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Add to cart:', item.id);
                          }}
                          className="flex-1 py-2 px-3 text-white text-xs font-medium rounded-lg"
                          style={{ backgroundColor: '#072415' }}
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Remove from saved:', item.id);
                          }}
                          className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg"
                        >
                          <i className="ri-heart-fill text-sm"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <i className="ri-inbox-line text-2xl text-gray-400"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Activity Found</h3>
            <p className="text-gray-500 text-sm mb-6">
              {activeActivityType === 'purchases' && 'You haven\'t made any purchases yet.'}
              {activeActivityType === 'bids' && 'You haven\'t placed any bids yet.'}
              {activeActivityType === 'offers' && 'You haven\'t made any offers yet.'}
              {activeActivityType === 'saved' && 'You haven\'t saved any items yet.'}
            </p>
            <Link href="/">
              <button
                className="px-6 py-3 text-white font-medium rounded-lg"
                style={{ backgroundColor: '#072415' }}
              >
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
