'use client';

import { useState } from 'react';

interface ProductActionsProps {
  productId: string;
  price: number;
}

export default function ProductActions({ productId, price }: ProductActionsProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsAddingToCart(false);
    // Show success message or update cart
  };

  const handleBuyNow = async () => {
    setIsBuying(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsBuying(false);
    // Navigate to checkout
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="flex space-x-3">
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-lg font-medium flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {isAddingToCart ? (
            <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-shopping-cart-line"></i>
              </div>
              <span>Add to Cart</span>
            </>
          )}
        </button>
        
        <button
          onClick={handleBuyNow}
          disabled={isBuying}
          className="flex-1 bg-red-500 text-white py-4 rounded-lg font-medium flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {isBuying ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <span>Buy Now - ${price}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}