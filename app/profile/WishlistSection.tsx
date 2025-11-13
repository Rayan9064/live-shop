
'use client';

import { useState } from 'react';

export default function WishlistSection() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 89.99,
      originalPrice: 129.99,
      image: 'https://readdy.ai/api/search-image?query=Premium%20wireless%20headphones%20in%20matte%20black%2C%20modern%20design%2C%20noise%20cancelling%2C%20studio%20lighting%2C%20product%20photography%2C%20clean%20white%20background&width=120&height=120&seq=wishlist-001&orientation=squarish',
      inStock: true,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      price: 199.99,
      originalPrice: 249.99,
      image: 'https://readdy.ai/api/search-image?query=Modern%20smartwatch%20with%20black%20sport%20band%2C%20fitness%20tracking%2C%20sleek%20design%2C%20studio%20lighting%2C%20product%20photography%2C%20clean%20white%20background&width=120&height=120&seq=wishlist-002&orientation=squarish',
      inStock: true,
      rating: 4.9
    },
    {
      id: 3,
      name: 'Luxury Face Serum',
      price: 45.00,
      originalPrice: 65.00,
      image: 'https://readdy.ai/api/search-image?query=Luxury%20skincare%20serum%20in%20elegant%20glass%20bottle%2C%20premium%20cosmetics%2C%20anti-aging%20formula%2C%20studio%20lighting%2C%20product%20photography%2C%20clean%20white%20background&width=120&height=120&seq=wishlist-003&orientation=squarish',
      inStock: false,
      rating: 4.7
    },
    {
      id: 4,
      name: 'Designer Crossbody Bag',
      price: 156.50,
      originalPrice: 220.00,
      image: 'https://readdy.ai/api/search-image?query=Elegant%20crossbody%20bag%20in%20cognac%20leather%2C%20designer%20fashion%20accessory%2C%20premium%20materials%2C%20studio%20lighting%2C%20product%20photography%2C%20clean%20white%20background&width=120&height=120&seq=wishlist-004&orientation=squarish',
      inStock: true,
      rating: 4.6
    },
    {
      id: 5,
      name: 'Minimalist Desk Lamp',
      price: 67.50,
      originalPrice: 89.99,
      image: 'https://readdy.ai/api/search-image?query=Modern%20minimalist%20desk%20lamp%20with%20adjustable%20arm%2C%20white%20metal%20finish%2C%20LED%20lighting%2C%20studio%20photography%2C%20clean%20white%20background&width=120&height=120&seq=wishlist-005&orientation=squarish',
      inStock: true,
      rating: 4.5
    },
    {
      id: 6,
      name: 'Organic Coffee Beans',
      price: 24.99,
      originalPrice: 32.99,
      image: 'https://readdy.ai/api/search-image?query=Premium%20organic%20coffee%20beans%20in%20elegant%20packaging%2C%20artisan%20roasted%2C%20gourmet%20coffee%2C%20studio%20lighting%2C%20product%20photography%2C%20clean%20white%20background&width=120&height=120&seq=wishlist-006&orientation=squarish',
      inStock: true,
      rating: 4.8
    }
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  const moveToCart = (id: number) => {
    // Add to cart logic here
    console.log('Added to cart:', id);
  };

  return (
    <div className="px-4">
      {wishlistItems.length > 0 ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              My Wishlist ({wishlistItems.length})
            </h2>
            <button className="text-[#072415] text-sm font-medium">
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white border border-gray-100 rounded-2xl p-3 relative group hover:shadow-lg transition-shadow">
                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <i className="ri-close-line text-gray-600 text-sm"></i>
                </button>

                {/* Product Image */}
                <div className="relative mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-32 object-cover rounded-xl"
                  />
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
                      <span className="text-white text-xs font-medium">Out of Stock</span>
                    </div>
                  )}
                  {item.originalPrice > item.price && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
                      -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900 text-sm leading-tight line-clamp-2" suppressHydrationWarning={true}>
                    {item.name}
                  </h3>
                  
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i
                          key={star}
                          className={`text-xs ${
                            star <= Math.floor(item.rating)
                              ? 'ri-star-fill text-yellow-400'
                              : 'ri-star-line text-gray-300'
                          }`}
                        ></i>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500" suppressHydrationWarning={true}>
                      ({item.rating})
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-[#072415]" suppressHydrationWarning={true}>
                      ${item.price}
                    </span>
                    {item.originalPrice > item.price && (
                      <span className="text-sm text-gray-500 line-through" suppressHydrationWarning={true}>
                        ${item.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => moveToCart(item.id)}
                    disabled={!item.inStock}
                    className={`w-full py-2 rounded-xl text-sm font-medium transition-colors ${
                      item.inStock
                        ? 'bg-[#072415] text-white hover:bg-[#0a3d1f]'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-heart-line text-gray-400 text-2xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Wishlist is Empty</h3>
          <p className="text-gray-600 mb-6">Save items you love to your wishlist and shop them later.</p>
          <button className="px-6 py-3 bg-[#072415] text-white rounded-xl font-medium hover:bg-[#0a3d1f] transition-colors">
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
}
