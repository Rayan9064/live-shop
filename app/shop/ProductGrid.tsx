
'use client';

import Link from 'next/link';
import { useProducts } from '@/lib/hooks/useProducts';
import { useCart } from '@/lib/hooks/useCart';
import { useState } from 'react';

export default function ProductGrid() {
  const { products, loading, error } = useProducts();
  const { addItem } = useCart();
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  const handleAddToCart = async (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setAddingToCart(product.id);
    
    try {
      await addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        quantity: 1,
        image: product.images[0] || '',
        seller: product.sellerName,
        inStock: product.stock > 0,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAddingToCart(null);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 px-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
            <div className="w-full h-32 bg-gray-200"></div>
            <div className="p-3 space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-8 text-center">
        <div className="text-red-500 mb-2">Failed to load products</div>
        <div className="text-sm text-gray-500">{error}</div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="px-4 py-8 text-center">
        <div className="text-gray-500">No products available</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 px-4">
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`}>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={product.images[0] || `https://readdy.ai/api/search-image?query=Product%20image&width=180&height=140&seq=shop-product-${product.id}&orientation=squarish`}
                alt={product.name}
                className="w-full h-32 object-cover object-top"
              />
              
              <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-1.5">
                <i className="ri-heart-line text-gray-600 text-sm"></i>
              </div>
              
              {product.stock === 0 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-xs font-medium">Out of Stock</span>
                </div>
              )}
            </div>
            
            <div className="p-3">
              <div className="text-sm font-medium text-gray-900 mb-1 truncate">{product.name}</div>
              
              <div className="flex items-center space-x-1 mb-2">
                {product.rating && (
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className={`ri-star-${i < Math.floor(product.rating!) ? 'fill' : 'line'} text-yellow-400 text-xs`}></i>
                    ))}
                  </div>
                )}
                {product.reviews && (
                  <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-sm" style={{ color: '#072415' }}>${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-gray-400 text-xs line-through">${product.originalPrice}</span>
                  )}
                </div>
                <button 
                  className="text-white p-1.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed" 
                  style={{ backgroundColor: '#072415' }}
                  onClick={(e) => handleAddToCart(product, e)}
                  disabled={product.stock === 0 || addingToCart === product.id}
                >
                  {addingToCart === product.id ? (
                    <i className="ri-loader-4-line text-xs animate-spin"></i>
                  ) : (
                    <i className="ri-shopping-cart-line text-xs"></i>
                  )}
                </button>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
