'use client';

import { useState } from 'react';

interface SellerTabsProps {
  sellerId: string;
}

export default function SellerTabs({ sellerId }: SellerTabsProps) {
  const [activeTab, setActiveTab] = useState('products');

  const tabs = [
    { id: 'products', label: 'Products', count: '248' },
    { id: 'reviews', label: 'Reviews', count: '1.2K' },
    { id: 'about', label: 'About', count: null }
  ];

  const products = [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      price: 89.99,
      originalPrice: 129.99,
      image: 'https://readdy.ai/api/search-image?query=Modern%20wireless%20bluetooth%20headphones%20with%20sleek%20black%20design%2C%20premium%20quality%20audio%20device%2C%20isolated%20on%20white%20background%2C%20product%20photography%20style%2C%20high%20detail%2C%20professional%20lighting&width=200&height=200&seq=seller-prod-1&orientation=squarish',
      rating: 4.8,
      reviews: 234,
      discount: 31
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      price: 199.99,
      originalPrice: 299.99,
      image: 'https://readdy.ai/api/search-image?query=Modern%20smart%20fitness%20watch%2C%20sleek%20design%2C%20black%20sport%20band%2C%20digital%20display%2C%20isolated%20on%20white%20background%2C%20technology%20product%20photography%2C%20high%20detail%2C%20professional%20lighting&width=200&height=200&seq=seller-prod-2&orientation=squarish',
      rating: 4.7,
      reviews: 412,
      discount: 33
    },
    {
      id: 3,
      name: 'Wireless Charging Pad',
      price: 29.99,
      originalPrice: 49.99,
      image: 'https://readdy.ai/api/search-image?query=Modern%20wireless%20charging%20pad%2C%20sleek%20black%20design%2C%20technology%20accessory%2C%20isolated%20on%20white%20background%2C%20product%20photography%20style%2C%20high%20detail%2C%20professional%20lighting&width=200&height=200&seq=seller-prod-3&orientation=squarish',
      rating: 4.6,
      reviews: 156,
      discount: 40
    },
    {
      id: 4,
      name: 'Bluetooth Speaker',
      price: 59.99,
      originalPrice: 89.99,
      image: 'https://readdy.ai/api/search-image?query=Portable%20bluetooth%20speaker%2C%20modern%20design%2C%20premium%20audio%20device%2C%20isolated%20on%20white%20background%2C%20product%20photography%20style%2C%20high%20detail%2C%20professional%20lighting&width=200&height=200&seq=seller-prod-4&orientation=squarish',
      rating: 4.5,
      reviews: 89,
      discount: 33
    }
  ];

  const reviews = [
    {
      id: 1,
      user: 'Sarah Johnson',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20female%20customer%20avatar%2C%20friendly%20smile%2C%20clean%20background%2C%20portrait%20style%2C%20high%20quality&width=40&height=40&seq=review-1&orientation=squarish',
      rating: 5,
      date: '2 days ago',
      comment: 'Amazing products and fast shipping! The quality exceeded my expectations.',
      product: 'Wireless Bluetooth Headphones'
    },
    {
      id: 2,
      user: 'Mike Chen',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20male%20customer%20avatar%2C%20confident%20smile%2C%20clean%20background%2C%20portrait%20style%2C%20high%20quality&width=40&height=40&seq=review-2&orientation=squarish',
      rating: 4,
      date: '1 week ago',
      comment: 'Great seller with excellent customer service. Highly recommended!',
      product: 'Smart Fitness Watch'
    },
    {
      id: 3,
      user: 'Emma Wilson',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20female%20customer%20avatar%2C%20warm%20smile%2C%20clean%20background%2C%20portrait%20style%2C%20high%20quality&width=40&height=40&seq=review-3&orientation=squarish',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Perfect packaging and the product works exactly as described.',
      product: 'Wireless Charging Pad'
    }
  ];

  return (
    <div className="px-4 pb-24">
      <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            {tab.label}
            {tab.count && (
              <span className="ml-1 text-xs text-gray-500">({tab.count})</span>
            )}
          </button>
        ))}
      </div>

      {activeTab === 'products' && (
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden" data-product-shop>
              <div className="relative">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover object-top"
                />
                
                {product.discount > 0 && (
                  <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                    -{product.discount}%
                  </div>
                )}
              </div>
              
              <div className="p-3">
                <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                  {product.name}
                </h3>
                
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 flex items-center justify-center">
                      <i className="ri-star-fill text-yellow-400 text-xs"></i>
                    </div>
                    <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
                    <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <span className="text-lg font-bold text-gray-900">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-start space-x-3">
                <img 
                  src={review.avatar}
                  alt={review.user}
                  className="w-10 h-10 rounded-full"
                />
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-900 text-sm">{review.user}</h4>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-3 h-3 flex items-center justify-center">
                        <i className={`ri-star-fill text-xs ${
                          i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}></i>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-2">{review.comment}</p>
                  
                  <div className="text-xs text-gray-500">
                    Product: {review.product}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'about' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="font-medium text-gray-900 mb-3">Store Policies</h3>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-truck-line text-gray-600"></i>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">Shipping</h4>
                  <p className="text-gray-600 text-sm">Free shipping on orders over $50. Standard delivery 3-5 business days.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-arrow-go-back-line text-gray-600"></i>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">Returns</h4>
                  <p className="text-gray-600 text-sm">30-day return policy. Items must be in original condition.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-shield-check-line text-gray-600"></i>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">Warranty</h4>
                  <p className="text-gray-600 text-sm">1-year manufacturer warranty on all electronic products.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="font-medium text-gray-900 mb-3">Contact Information</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-mail-line text-gray-600"></i>
                </div>
                <span className="text-gray-600 text-sm">support@techworld.com</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-phone-line text-gray-600"></i>
                </div>
                <span className="text-gray-600 text-sm">+1 (555) 123-4567</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-time-line text-gray-600"></i>
                </div>
                <span className="text-gray-600 text-sm">Mon-Fri 9AM-6PM EST</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}