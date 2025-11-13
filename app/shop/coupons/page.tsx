'use client';

import { useState } from 'react';
import Link from 'next/link';
import BottomTabBar from '../../../components/BottomTabBar';

export default function CouponsPage() {
  const [activeTab, setActiveTab] = useState('Available');
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  const tabs = ['Available', 'Used', 'Expired'];

  const coupons = [
    {
      id: 1,
      code: 'WELCOME20',
      title: '20% Off First Order',
      description: 'Get 20% discount on your first purchase. Valid for new customers only.',
      discount: '20%',
      minOrder: 50,
      maxDiscount: 25,
      expiryDate: '2024-02-15',
      status: 'available',
      category: 'Welcome',
      image: 'https://readdy.ai/api/search-image?query=Welcome%20discount%20coupon%20design%2C%2020%20percent%20off%20badge%2C%20promotional%20offer%20graphic%2C%20modern%20design%2C%20isolated%20on%20white%20background%2C%20high%20detail%2C%20minimalist%20composition&width=100&height=60&seq=1&orientation=landscape',
      isPopular: true
    },
    {
      id: 2,
      code: 'ELECTRONICS15',
      title: '15% Off Electronics',
      description: 'Special discount on all electronic items including phones, laptops, and accessories.',
      discount: '15%',
      minOrder: 100,
      maxDiscount: 50,
      expiryDate: '2024-02-20',
      status: 'available',
      category: 'Electronics',
      image: 'https://readdy.ai/api/search-image?query=Electronics%20discount%20coupon%20design%2C%2015%20percent%20off%20badge%2C%20tech%20promotional%20offer%20graphic%2C%20modern%20design%2C%20isolated%20on%20white%20background%2C%20high%20detail%2C%20minimalist%20composition&width=100&height=60&seq=2&orientation=landscape',
      isPopular: false
    },
    {
      id: 3,
      code: 'FASHION25',
      title: '25% Off Fashion',
      description: 'Huge savings on all fashion items. Perfect time to update your wardrobe.',
      discount: '25%',
      minOrder: 75,
      maxDiscount: 40,
      expiryDate: '2024-02-10',
      status: 'available',
      category: 'Fashion',
      image: 'https://readdy.ai/api/search-image?query=Fashion%20discount%20coupon%20design%2C%2025%20percent%20off%20badge%2C%20clothing%20promotional%20offer%20graphic%2C%20modern%20design%2C%20isolated%20on%20white%20background%2C%20high%20detail%2C%20minimalist%20composition&width=100&height=60&seq=3&orientation=landscape',
      isPopular: true
    },
    {
      id: 4,
      code: 'FREESHIP',
      title: 'Free Shipping',
      description: 'Free shipping on orders over $30. No minimum purchase required.',
      discount: 'Free Ship',
      minOrder: 30,
      maxDiscount: 10,
      expiryDate: '2024-03-01',
      status: 'available',
      category: 'Shipping',
      image: 'https://readdy.ai/api/search-image?query=Free%20shipping%20coupon%20design%2C%20delivery%20truck%20icon%2C%20promotional%20offer%20graphic%2C%20modern%20design%2C%20isolated%20on%20white%20background%2C%20high%20detail%2C%20minimalist%20composition&width=100&height=60&seq=4&orientation=landscape',
      isPopular: false
    },
    {
      id: 5,
      code: 'BEAUTY30',
      title: '30% Off Beauty Products',
      description: 'Amazing discount on skincare, makeup, and beauty accessories.',
      discount: '30%',
      minOrder: 60,
      maxDiscount: 35,
      expiryDate: '2024-01-30',
      status: 'used',
      category: 'Beauty',
      image: 'https://readdy.ai/api/search-image?query=Beauty%20discount%20coupon%20design%2C%2030%20percent%20off%20badge%2C%20cosmetics%20promotional%20offer%20graphic%2C%20modern%20design%2C%20isolated%20on%20white%20background%2C%20high%20detail%2C%20minimalist%20composition&width=100&height=60&seq=5&orientation=landscape',
      isPopular: false
    },
    {
      id: 6,
      code: 'HOLIDAY50',
      title: '50% Off Holiday Sale',
      description: 'Biggest discount of the year! Limited time holiday special offer.',
      discount: '50%',
      minOrder: 200,
      maxDiscount: 100,
      expiryDate: '2024-01-15',
      status: 'expired',
      category: 'Holiday',
      image: 'https://readdy.ai/api/search-image?query=Holiday%20discount%20coupon%20design%2C%2050%20percent%20off%20badge%2C%20festive%20promotional%20offer%20graphic%2C%20modern%20design%2C%20isolated%20on%20white%20background%2C%20high%20detail%2C%20minimalist%20composition&width=100&height=60&seq=6&orientation=landscape',
      isPopular: false
    }
  ];

  const filteredCoupons = coupons.filter(coupon => {
    if (activeTab === 'Available') return coupon.status === 'available';
    if (activeTab === 'Used') return coupon.status === 'used';
    if (activeTab === 'Expired') return coupon.status === 'expired';
    return true;
  });

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-50 border-green-200';
      case 'used': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'expired': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Welcome': return 'bg-purple-100 text-purple-700';
      case 'Electronics': return 'bg-blue-100 text-blue-700';
      case 'Fashion': return 'bg-pink-100 text-pink-700';
      case 'Beauty': return 'bg-rose-100 text-rose-700';
      case 'Shipping': return 'bg-green-100 text-green-700';
      case 'Holiday': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const availableCount = coupons.filter(c => c.status === 'available').length;
  const usedCount = coupons.filter(c => c.status === 'used').length;
  const expiredCount = coupons.filter(c => c.status === 'expired').length;

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
              <h1 className="text-xl font-bold text-gray-900">My Coupons</h1>
              <p className="text-sm text-gray-500">{availableCount} available</p>
            </div>
          </div>
          <button className="w-10 h-10 flex items-center justify-center">
            <i className="ri-search-line text-xl text-gray-700"></i>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{availableCount}</div>
            <div className="text-xs text-gray-500">Available</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{usedCount}</div>
            <div className="text-xs text-gray-500">Used</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{expiredCount}</div>
            <div className="text-xs text-gray-500">Expired</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium ${
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

      {/* Coupons List */}
      <div className="px-4 py-4 pb-20">
        {filteredCoupons.length > 0 ? (
          <div className="space-y-4">
            {filteredCoupons.map((coupon) => (
              <div key={coupon.id} className={`border-2 border-dashed rounded-lg p-4 relative ${getStatusColor(coupon.status)}`}>
                {coupon.isPopular && coupon.status === 'available' && (
                  <div className="absolute -top-2 left-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                    POPULAR
                  </div>
                )}
                
                <div className="flex items-start space-x-4">
                  <img 
                    src={coupon.image}
                    alt={coupon.title}
                    className="w-20 h-12 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-bold text-gray-900">{coupon.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(coupon.category)}`}>
                            {coupon.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{coupon.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{coupon.discount}</div>
                        <div className="text-xs text-gray-500">OFF</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span>Min order: ${coupon.minOrder}</span>
                      <span>Max save: ${coupon.maxDiscount}</span>
                      <span>Expires: {coupon.expiryDate}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2 font-mono text-sm font-bold text-gray-900">
                        {coupon.code}
                      </div>
                      
                      {coupon.status === 'available' && (
                        <button
                          onClick={() => copyToClipboard(coupon.code)}
                          className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-1"
                        >
                          <i className={`${copiedCoupon === coupon.code ? 'ri-check-line' : 'ri-file-copy-line'} text-sm`}></i>
                          <span>{copiedCoupon === coupon.code ? 'Copied!' : 'Copy'}</span>
                        </button>
                      )}
                      
                      {coupon.status === 'used' && (
                        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
                          Used
                        </div>
                      )}
                      
                      {coupon.status === 'expired' && (
                        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm font-medium">
                          Expired
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-coupon-line text-gray-400 text-3xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No {activeTab.toLowerCase()} coupons</h3>
            <p className="text-gray-500 mb-6">You don't have any {activeTab.toLowerCase()} coupons at the moment.</p>
            {activeTab === 'Available' && (
              <Link href="/shop">
                <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium">
                  Discover Offers
                </button>
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      {activeTab === 'Available' && (
        <button className="fixed bottom-24 right-4 w-14 h-14 bg-gray-900 text-white rounded-full shadow-lg flex items-center justify-center z-10">
          <i className="ri-add-line text-2xl"></i>
        </button>
      )}

      <BottomTabBar />
    </div>
  );
}