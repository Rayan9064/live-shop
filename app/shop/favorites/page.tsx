'use client';

import { useState } from 'react';
import Link from 'next/link';
import BottomTabBar from '../../../components/BottomTabBar';

export default function FavoritesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set([1, 3, 5, 7, 9]));

  const categories = ['All', 'Electronics', 'Fashion', 'Beauty', 'Home', 'Sports'];

  const favoriteProducts = [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.8,
      reviews: 234,
      image: 'https://readdy.ai/api/search-image?query=Modern%20wireless%20bluetooth%20headphones%20with%20sleek%20black%20design%2C%20premium%20quality%20audio%20device%2C%20isolated%20on%20white%20background%2C%20product%20photography%20style%2C%20high%20detail%2C%20professional%20lighting%2C%20minimalist%20composition&width=300&height=300&seq=1&orientation=squarish',
      category: 'Electronics',
      discount: 31,
      inStock: true,
      addedDate: '2024-01-15'
    },
    {
      id: 3,
      name: 'Organic Face Serum',
      price: 34.99,
      originalPrice: 49.99,
      rating: 4.9,
      reviews: 89,
      image: 'https://readdy.ai/api/search-image?query=Premium%20organic%20face%20serum%20bottle%2C%20luxury%20skincare%20product%2C%20elegant%20packaging%2C%20isolated%20on%20white%20background%2C%20beauty%20product%20photography%2C%20high%20detail%2C%20professional%20lighting%2C%20minimalist%20composition&width=300&height=300&seq=3&orientation=squarish',
      category: 'Beauty',
      discount: 30,
      inStock: true,
      addedDate: '2024-01-18'
    },
    {
      id: 5,
      name: 'Ceramic Plant Pot Set',
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.5,
      reviews: 67,
      image: 'https://readdy.ai/api/search-image?query=Set%20of%20ceramic%20plant%20pots%2C%20modern%20home%20decor%2C%20white%20and%20terracotta%20colors%2C%20isolated%20on%20white%20background%2C%20home%20and%20garden%20photography%2C%20high%20detail%2C%20professional%20lighting%2C%20minimalist%20composition&width=300&height=300&seq=5&orientation=squarish',
      category: 'Home',
      discount: 25,
      inStock: false,
      addedDate: '2024-01-20'
    },
    {
      id: 7,
      name: 'Leather Crossbody Bag',
      price: 149.99,
      originalPrice: 199.99,
      rating: 4.6,
      reviews: 178,
      image: 'https://readdy.ai/api/search-image?query=Elegant%20leather%20crossbody%20bag%2C%20luxury%20fashion%20accessory%2C%20brown%20leather%2C%20isolated%20on%20white%20background%2C%20fashion%20photography%20style%2C%20high%20detail%2C%20professional%20lighting%2C%20minimalist%20composition&width=300&height=300&seq=7&orientation=squarish',
      category: 'Fashion',
      discount: 25,
      inStock: true,
      addedDate: '2024-01-22'
    },
    {
      id: 9,
      name: 'Wireless Charging Pad',
      price: 24.99,
      originalPrice: 39.99,
      rating: 4.4,
      reviews: 92,
      image: 'https://readdy.ai/api/search-image?query=Sleek%20wireless%20charging%20pad%2C%20modern%20technology%20accessory%2C%20black%20circular%20design%2C%20isolated%20on%20white%20background%2C%20tech%20product%20photography%2C%20high%20detail%2C%20professional%20lighting%2C%20minimalist%20composition&width=300&height=300&seq=9&orientation=squarish',
      category: 'Electronics',
      discount: 38,
      inStock: true,
      addedDate: '2024-01-25'
    }
  ];

  const toggleLike = (productId: number) => {
    const newLiked = new Set(likedProducts);
    if (newLiked.has(productId)) {
      newLiked.delete(productId);
    } else {
      newLiked.add(productId);
    }
    setLikedProducts(newLiked);
  };

  const filteredProducts = selectedCategory === 'All' 
    ? favoriteProducts 
    : favoriteProducts.filter(product => product.category === selectedCategory);

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
              <h1 className="text-xl font-bold text-gray-900">Favorites</h1>
              <p className="text-sm text-gray-500">{favoriteProducts.length} items</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="w-10 h-10 flex items-center justify-center"
            >
              <i className={`${viewMode === 'grid' ? 'ri-list-check' : 'ri-grid-line'} text-xl text-gray-700`}></i>
            </button>
            <button className="w-10 h-10 flex items-center justify-center">
              <i className="ri-search-line text-xl text-gray-700"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex space-x-3">
          <button className="flex-1 bg-gray-900 text-white py-3 rounded-lg text-sm font-medium">
            Add All to Cart
          </button>
          <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg text-sm font-medium">
            Share List
          </button>
        </div>
      </div>

      {/* Products */}
      <div className="px-4 py-4 pb-20">
        {filteredProducts.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden" data-product-shop>
                  <div className="relative">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover object-top"
                    />
                    
                    {product.discount > 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        -{product.discount}%
                      </div>
                    )}
                    
                    {!product.inStock && (
                      <div className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Out of Stock
                      </div>
                    )}
                    
                    <button
                      onClick={() => toggleLike(product.id)}
                      className="absolute bottom-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm transition-transform hover:scale-110"
                    >
                      <i className={`${likedProducts.has(product.id) ? 'ri-heart-fill text-red-500' : 'ri-heart-line text-gray-600'}`}></i>
                    </button>
                  </div>
                  
                  <div className="p-3">
                    <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        <i className="ri-star-fill text-yellow-400 text-xs"></i>
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
                      
                      <button 
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${
                          product.inStock 
                            ? 'bg-gray-900 text-white' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!product.inStock}
                      >
                        <i className="ri-shopping-cart-line text-sm"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm" data-product-shop>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-medium">Out of Stock</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                      
                      <div className="flex items-center mb-2">
                        <i className="ri-star-fill text-yellow-400 text-xs"></i>
                        <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
                        <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
                        <span className="text-xs text-gray-400 ml-2">Added {product.addedDate}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-gray-900">${product.price}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                          )}
                          {product.discount > 0 && (
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                              -{product.discount}%
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleLike(product.id)}
                            className="w-8 h-8 flex items-center justify-center"
                          >
                            <i className={`${likedProducts.has(product.id) ? 'ri-heart-fill text-red-500' : 'ri-heart-line text-gray-600'}`}></i>
                          </button>
                          <button 
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${
                              product.inStock 
                                ? 'bg-gray-900 text-white' 
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                            disabled={!product.inStock}
                          >
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-heart-line text-gray-400 text-3xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No favorites yet</h3>
            <p className="text-gray-500 mb-6">Start adding products to your favorites to see them here.</p>
            <Link href="/shop">
              <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium">
                Discover Products
              </button>
            </Link>
          </div>
        )}
      </div>

      <BottomTabBar />
    </div>
  );
}