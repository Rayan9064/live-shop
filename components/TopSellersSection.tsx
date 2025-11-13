
'use client';

import Link from 'next/link';

const sellersData = [
  {
    id: 1,
    name: "Emma's Boutique",
    category: "Fashion",
    followers: "156K",
    rating: 4.9,
    products: 248,
    avatar: "Professional female fashion seller avatar, stylish appearance, friendly smile, clean background, portrait style, high quality, business professional"
  },
  {
    id: 2,
    name: "Tech World Store",
    category: "Electronics",
    followers: "89K",
    rating: 4.8,
    products: 156,
    avatar: "Professional male tech seller avatar, modern appearance, confident smile, clean background, portrait style, high quality, technology expert"
  },
  {
    id: 3,
    name: "Beauty Palace",
    category: "Cosmetics",
    followers: "234K",
    rating: 4.9,
    products: 892,
    avatar: "Professional female beauty expert avatar, glamorous appearance, warm smile, clean background, portrait style, high quality, beauty specialist"
  },
  {
    id: 4,
    name: "Home Style Hub",
    category: "Home & Garden",
    followers: "67K",
    rating: 4.7,
    products: 324,
    avatar: "Professional interior design expert avatar, sophisticated appearance, friendly smile, clean background, portrait style, high quality, home decorator"
  }
];

export default function TopSellersSection() {
  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Top Sellers</h2>
        <button className="text-sm font-medium" style={{ color: '#072415' }}>View All</button>
      </div>
      
      <div className="space-y-3">
        {sellersData.map((seller, index) => (
          <Link key={seller.id} href={`/seller/${seller.id}`}>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={`https://readdy.ai/api/search-image?query=$%7Bseller.avatar%7D&width=50&height=50&seq=seller-${seller.id}&orientation=squarish`}
                    alt={seller.name}
                    className="w-12 h-12 rounded-full"
                  />
                  {index < 3 && (
                    <div className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-between">
                      {index + 1}
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{seller.name}</h3>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      className="text-white px-3 py-1 rounded-full text-xs font-medium" 
                      style={{ backgroundColor: '#072415' }}
                    >
                      Follow
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{seller.category}</span>
                    <div className="flex items-center">
                      <i className="ri-user-line mr-1"></i>
                      <span>{seller.followers}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-star-fill text-yellow-400 mr-1"></i>
                      <span>{seller.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-shopping-bag-line mr-1"></i>
                      <span>{seller.products}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
