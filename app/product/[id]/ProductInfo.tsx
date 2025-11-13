'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ProductInfoProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviews: number;
    description: string;
    seller: {
      id: string;
      name: string;
      avatar: string;
      rating: number;
      followers: string;
    };
    variants: {
      colors: string[];
      sizes: string[];
    };
    shipping: {
      free: boolean;
      days: string;
    };
    stock: number;
  };
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(product.variants.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.variants.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="px-4 pb-24">
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <h1 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h1>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-red-500">${product.price}</span>
            <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-bold">
              -{discount}%
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-star-fill text-yellow-400"></i>
            </div>
            <span className="text-sm font-medium text-gray-900 ml-1">{product.rating}</span>
            <span className="text-sm text-gray-500 ml-1">({product.reviews} reviews)</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-truck-line"></i>
            </div>
            <span className="ml-1">
              {product.shipping.free ? 'Free delivery' : 'Paid delivery'} in {product.shipping.days}
            </span>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-4">
          <div className="mb-4">
            <h3 className="font-medium text-gray-900 mb-2">Color</h3>
            <div className="flex space-x-2">
              {product.variants.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-2 rounded-lg border text-sm font-medium ${
                    selectedColor === color
                      ? 'border-red-500 bg-red-50 text-red-600'
                      : 'border-gray-200 text-gray-700'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="font-medium text-gray-900 mb-2">Size</h3>
            <div className="flex space-x-2">
              {product.variants.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-2 rounded-lg border text-sm font-medium ${
                    selectedSize === size
                      ? 'border-red-500 bg-red-50 text-red-600'
                      : 'border-gray-200 text-gray-700'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="font-medium text-gray-900 mb-2">Quantity</h3>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-subtract-line text-gray-600"></i>
                </div>
              </button>
              
              <span className="text-lg font-medium text-gray-900 min-w-[2rem] text-center">
                {quantity}
              </span>
              
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-add-line text-gray-600"></i>
                </div>
              </button>
              
              <span className="text-sm text-gray-500 ml-2">
                {product.stock} available
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <Link href={`/seller/${product.seller.id}`} className="flex items-center space-x-3 mb-4">
          <img 
            src={product.seller.avatar}
            alt={product.seller.name}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{product.seller.name}</h3>
            <div className="flex items-center space-x-3 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-3 h-3 flex items-center justify-center">
                  <i className="ri-star-fill text-yellow-400"></i>
                </div>
                <span className="ml-1">{product.seller.rating}</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 flex items-center justify-center">
                  <i className="ri-user-line"></i>
                </div>
                <span className="ml-1">{product.seller.followers}</span>
              </div>
            </div>
          </div>
          <div className="w-6 h-6 flex items-center justify-center">
            <i className="ri-arrow-right-s-line text-gray-400"></i>
          </div>
        </Link>
        
        <div className="flex space-x-2">
          <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium">
            Message
          </button>
          <button className="flex-1 bg-red-500 text-white py-3 rounded-lg font-medium">
            Follow
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-medium text-gray-900 mb-3">Description</h3>
        <p className={`text-gray-600 text-sm leading-relaxed ${
          showFullDescription ? '' : 'line-clamp-3'
        }`}>
          {product.description}
        </p>
        <button
          onClick={() => setShowFullDescription(!showFullDescription)}
          className="text-red-500 text-sm font-medium mt-2"
        >
          {showFullDescription ? 'Show Less' : 'Read More'}
        </button>
      </div>
    </div>
  );
}