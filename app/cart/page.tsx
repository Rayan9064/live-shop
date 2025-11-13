
'use client';

import Link from 'next/link';
import { useState } from 'react';

const cartItems = [
  {
    id: 1,
    name: "Wireless Earbuds",
    price: 79.99,
    originalPrice: 129.99,
    quantity: 2,
    image: "Premium wireless earbuds in sleek charging case, modern design, white background, product photography style, high quality, clean aesthetic, technology product",
    seller: "TechStore",
    inStock: true
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    originalPrice: 299.99,
    quantity: 1,
    image: "Modern smartwatch with digital display, sleek design, premium materials, product photography, clean white background, high quality, technology accessory",
    seller: "WearableTech",
    inStock: true
  },
  {
    id: 3,
    name: "Phone Case",
    price: 24.99,
    originalPrice: 39.99,
    quantity: 1,
    image: "Stylish smartphone protective case, modern design, premium materials, product photography style, clean background, mobile accessory, high quality",
    seller: "CaseWorld",
    inStock: false
  }
];

export default function CartPage() {
  const [items, setItems] = useState(cartItems);
  const [selectedItems, setSelectedItems] = useState(new Set([1, 2]));

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const toggleSelectItem = (id: number) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const selectedTotal = items
    .filter(item => selectedItems.has(item.id) && item.inStock)
    .reduce((total, item) => total + (item.price * item.quantity), 0);

  const selectedCount = Array.from(selectedItems).filter(id => 
    items.find(item => item.id === id)?.inStock
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <i className="ri-arrow-left-line text-xl text-gray-700"></i>
            </Link>
            <h1 className="text-lg font-bold text-gray-900">Shopping Cart</h1>
          </div>
          <span className="text-sm text-gray-500">({items.length} items)</span>
        </div>
      </div>

      {/* Cart Items */}
      <div className="px-4 py-4 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-start space-x-3">
              {/* Checkbox */}
              <button
                onClick={() => toggleSelectItem(item.id)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-1 ${
                  selectedItems.has(item.id) && item.inStock
                    ? 'border-green-500 bg-green-500'
                    : 'border-gray-300'
                } ${!item.inStock ? 'opacity-50' : ''}`}
                disabled={!item.inStock}
              >
                {selectedItems.has(item.id) && item.inStock && (
                  <i className="ri-check-line text-white text-xs"></i>
                )}
              </button>

              {/* Product Image */}
              <img
                src={`https://readdy.ai/api/search-image?query=$%7Bitem.image%7D&width=80&height=80&seq=cart-${item.id}&orientation=squarish`}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover"
              />

              {/* Product Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">by {item.seller}</p>
                    {!item.inStock && (
                      <p className="text-xs text-red-500 mt-1">Out of stock</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <i className="ri-delete-bin-line text-sm"></i>
                  </button>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm" style={{ color: '#072415' }}>
                      ${item.price}
                    </span>
                    <span className="text-gray-400 text-xs line-through">
                      ${item.originalPrice}
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center"
                      disabled={!item.inStock}
                    >
                      <i className="ri-subtract-line text-xs"></i>
                    </button>
                    <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center"
                      disabled={!item.inStock}
                    >
                      <i className="ri-add-line text-xs"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommended Products */}
      <div className="px-4 py-4">
        <h2 className="text-lg font-bold text-gray-900 mb-3">You might also like</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              id: 5,
              name: "Bluetooth Speaker",
              price: "$89.99",
              image: "Portable bluetooth speaker with premium sound quality, modern design, clean white background, audio device, product photography style, high quality"
            },
            {
              id: 6,
              name: "Laptop Stand",
              price: "$45.99",
              image: "Adjustable laptop stand for ergonomic workspace, aluminum design, modern office accessory, clean background, product photography, professional quality"
            }
          ].map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                <img
                  src={`https://readdy.ai/api/search-image?query=$%7Bproduct.image%7D&width=150&height=120&seq=rec-${product.id}&orientation=squarish`}
                  alt={product.name}
                  className="w-full h-24 object-cover"
                />
                <div className="p-2">
                  <p className="text-xs font-medium text-gray-900 truncate">{product.name}</p>
                  <p className="text-sm font-bold mt-1" style={{ color: '#072415' }}>{product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Checkout */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                const allInStock = items.filter(item => item.inStock).map(item => item.id);
                setSelectedItems(
                  selectedItems.size === allInStock.length 
                    ? new Set() 
                    : new Set(allInStock)
                );
              }}
              className="text-sm text-gray-600"
            >
              Select All
            </button>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Total ({selectedCount} items)</p>
            <p className="text-lg font-bold" style={{ color: '#072415' }}>
              ${selectedTotal.toFixed(2)}
            </p>
          </div>
        </div>
        
        <button
          className="w-full py-3 rounded-xl text-white font-medium"
          style={{ backgroundColor: '#072415' }}
          disabled={selectedCount === 0}
        >
          Checkout ({selectedCount})
        </button>
      </div>
    </div>
  );
}
