
'use client';

import Link from 'next/link';
import { useState } from 'react';

const recentSearches = [
  'wireless earbuds',
  'smart watch',
  'phone case',
  'bluetooth speaker'
];

const trendingSearches = [
  'iPhone 15 case',
  'gaming headset',
  'laptop stand',
  'portable charger',
  'wireless mouse',
  'tablet holder'
];

const searchResults = [
  {
    id: 1,
    name: "Wireless Earbuds Pro",
    price: "$79.99",
    originalPrice: "$129.99",
    rating: 4.8,
    sold: "2.1K",
    image: "Premium wireless earbuds in sleek charging case, modern design, white background, product photography style, high quality, clean aesthetic, technology product"
  },
  {
    id: 2,
    name: "Wireless Gaming Earbuds",
    price: "$99.99",
    originalPrice: "$149.99",
    rating: 4.7,
    sold: "1.5K",
    image: "Gaming wireless earbuds with RGB lighting, modern design, white background, product photography style, high quality, gaming aesthetic, technology product"
  },
  {
    id: 3,
    name: "Sport Wireless Earbuds",
    price: "$59.99",
    originalPrice: "$89.99",
    rating: 4.6,
    sold: "3.2K",
    image: "Sport wireless earbuds with ear hooks, waterproof design, white background, product photography style, high quality, fitness aesthetic, technology product"
  }
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowResults(query.length > 0);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center space-x-3">
          <Link href="/">
            <i className="ri-arrow-left-line text-xl text-gray-700"></i>
          </Link>
          
          <div className="flex-1 relative">
            <div className="bg-gray-50 rounded-full px-4 py-2 flex items-center space-x-2">
              <i className="ri-search-line text-gray-400 text-sm"></i>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none"
                autoFocus
              />
              {searchQuery && (
                <button onClick={clearSearch}>
                  <i className="ri-close-line text-gray-400 text-sm"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {!showResults ? (
        <div className="px-4 py-4">
          {/* Recent Searches */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-900">Recent Searches</h2>
              <button className="text-sm text-gray-500">Clear all</button>
            </div>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(search)}
                  className="flex items-center space-x-3 w-full text-left py-2"
                >
                  <i className="ri-time-line text-gray-400"></i>
                  <span className="text-gray-700">{search}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Trending Searches */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Trending</h2>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(search)}
                  className="px-3 py-1.5 bg-white rounded-full text-sm text-gray-700 border border-gray-200"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {/* Popular Categories */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Popular Categories</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Electronics', icon: 'ri-smartphone-line', color: 'bg-blue-500' },
                { name: 'Fashion', icon: 'ri-shirt-line', color: 'bg-pink-500' },
                { name: 'Home & Garden', icon: 'ri-home-line', color: 'bg-green-500' },
                { name: 'Sports', icon: 'ri-football-line', color: 'bg-orange-500' }
              ].map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(category.name.toLowerCase())}
                  className="bg-white rounded-xl p-4 text-center shadow-sm"
                >
                  <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mx-auto mb-2`}>
                    <i className={`${category.icon} text-white text-xl`}></i>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{category.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="px-4 py-4">
          {/* Search Results Header */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600">
              Found {searchResults.length} results for "{searchQuery}"
            </p>
            <button className="flex items-center space-x-1 text-sm text-gray-600">
              <i className="ri-sound-module-line"></i>
              <span>Filter</span>
            </button>
          </div>

          {/* Search Results */}
          <div className="space-y-3">
            {searchResults.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="bg-white rounded-xl p-3 shadow-sm flex items-center space-x-3">
                  <img
                    src={`https://readdy.ai/api/search-image?query=$%7Bproduct.image%7D&width=80&height=80&seq=search-${product.id}&orientation=squarish`}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-sm">{product.name}</h3>
                    
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className={`ri-star-${i < Math.floor(product.rating) ? 'fill' : 'line'} text-yellow-400 text-xs`}></i>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">({product.sold} sold)</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="font-bold text-sm" style={{ color: '#072415' }}>{product.price}</span>
                      <span className="text-gray-400 text-xs line-through">{product.originalPrice}</span>
                    </div>
                  </div>
                  
                  <button 
                    className="text-white p-2 rounded-full" 
                    style={{ backgroundColor: '#072415' }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <i className="ri-shopping-cart-line text-sm"></i>
                  </button>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-6">
            <button 
              className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 text-sm"
            >
              Load More Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
