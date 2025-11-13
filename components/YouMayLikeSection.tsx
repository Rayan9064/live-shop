
'use client';

import Link from 'next/link';

const productsData = [
  {
    id: 1,
    name: "Wireless Earbuds",
    price: "$79.99",
    originalPrice: "$129.99",
    rating: 4.8,
    sold: "2.1K",
    image: "Premium wireless earbuds in sleek charging case, modern design, white background, product photography style, high quality, clean aesthetic, technology product"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "$199.99",
    originalPrice: "$299.99",
    rating: 4.9,
    sold: "856",
    image: "Modern smartwatch with digital display, sleek design, premium materials, product photography, clean white background, high quality, technology accessory"
  },
  {
    id: 3,
    name: "Phone Case",
    price: "$24.99",
    originalPrice: "$39.99",
    rating: 4.7,
    sold: "5.3K",
    image: "Stylish smartphone protective case, modern design, premium materials, product photography style, clean background, mobile accessory, high quality"
  },
  {
    id: 4,
    name: "Portable Charger",
    price: "$35.99",
    originalPrice: "$49.99",
    rating: 4.6,
    sold: "1.8K",
    image: "Compact portable power bank charger, sleek design, modern technology product, clean white background, product photography, high quality electronic device"
  }
];

export default function YouMayLikeSection() {
  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">You May Also Like</h2>
        <Link href="/shop" className="text-sm font-medium" style={{ color: '#072415' }}>See More</Link>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {productsData.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
              <div className="relative">
                <img
                  src={`https://readdy.ai/api/search-image?query=$%7Bproduct.image%7D&width=180&height=140&seq=product-${product.id}&orientation=squarish`}
                  alt={product.name}
                  className="w-full h-32 object-cover object-top"
                />
                
                <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-1.5">
                  <i className="ri-heart-line text-gray-600 text-sm"></i>
                </div>
              </div>
              
              <div className="p-3">
                <div className="text-sm font-medium text-gray-900 mb-1 truncate">{product.name}</div>
                
                <div className="flex items-center space-x-1 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className={`ri-star-${i < Math.floor(product.rating) ? 'fill' : 'line'} text-yellow-400 text-xs`}></i>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">({product.sold} sold)</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm" style={{ color: '#072415' }}>{product.price}</span>
                    <span className="text-gray-400 text-xs line-through">{product.originalPrice}</span>
                  </div>
                  <button 
                    className="text-white p-1.5 rounded-full" 
                    style={{ backgroundColor: '#072415' }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Add to cart functionality
                    }}
                  >
                    <i className="ri-shopping-cart-line text-xs"></i>
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
