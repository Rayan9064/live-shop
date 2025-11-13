'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PaymentMethodsPage() {
  const [showAddCard, setShowAddCard] = useState(false);
  const [cards, setCards] = useState([
    {
      id: 1,
      type: 'visa',
      last4: '4532',
      expiryMonth: '12',
      expiryYear: '25',
      isDefault: true
    },
    {
      id: 2,
      type: 'mastercard',
      last4: '8901',
      expiryMonth: '08',
      expiryYear: '26',
      isDefault: false
    }
  ]);

  const [newCard, setNewCard] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const addCard = () => {
    // Add card logic here
    setShowAddCard(false);
    setNewCard({ number: '', expiry: '', cvv: '', name: '' });
  };

  const removeCard = (id: number) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const setDefaultCard = (id: number) => {
    setCards(cards.map(card => ({
      ...card,
      isDefault: card.id === id
    })));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/profile">
              <i className="ri-arrow-left-line text-xl text-gray-700"></i>
            </Link>
            <h1 className="text-lg font-bold text-gray-900">Payment Methods</h1>
          </div>
          <button
            onClick={() => setShowAddCard(true)}
            className="text-sm font-medium"
            style={{ color: '#072415' }}
          >
            Add Card
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="pt-16 pb-20 px-4">
        <div className="space-y-4">
          {/* Saved Cards */}
          {cards.map((card) => (
            <div key={card.id} className="bg-white rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <i className={`${card.type === 'visa' ? 'ri-visa-line' : 'ri-mastercard-line'} text-white text-lg`}></i>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">•••• •••• •••• {card.last4}</p>
                    <p className="text-sm text-gray-500">Expires {card.expiryMonth}/{card.expiryYear}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeCard(card.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <i className="ri-delete-bin-line text-lg"></i>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                {card.isDefault ? (
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Default</span>
                ) : (
                  <button
                    onClick={() => setDefaultCard(card.id)}
                    className="text-sm font-medium"
                    style={{ color: '#072415' }}
                  >
                    Set as Default
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Other Payment Methods */}
          <div className="bg-white rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-4">Other Payment Methods</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <i className="ri-paypal-line text-blue-600 text-lg"></i>
                  </div>
                  <span className="font-medium text-gray-900">PayPal</span>
                </div>
                <button className="text-sm font-medium" style={{ color: '#072415' }}>
                  Connect
                </button>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <i className="ri-apple-line text-green-600 text-lg"></i>
                  </div>
                  <span className="font-medium text-gray-900">Apple Pay</span>
                </div>
                <button className="text-sm font-medium" style={{ color: '#072415' }}>
                  Connect
                </button>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <i className="ri-google-line text-yellow-600 text-lg"></i>
                  </div>
                  <span className="font-medium text-gray-900">Google Pay</span>
                </div>
                <button className="text-sm font-medium" style={{ color: '#072415' }}>
                  Connect
                </button>
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div className="bg-white rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-4">Billing Address</h3>
            <div className="text-sm text-gray-600">
              <p>Sarah Johnson</p>
              <p>123 Main Street, Apt 4B</p>
              <p>New York, NY 10001</p>
              <p>United States</p>
            </div>
            <button className="text-sm font-medium mt-3" style={{ color: '#072415' }}>
              Edit Address
            </button>
          </div>
        </div>
      </div>

      {/* Add Card Modal */}
      {showAddCard && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Add New Card</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Card Number"
                value={newCard.number}
                onChange={(e) => setNewCard({...newCard, number: e.target.value})}
                className="w-full p-3 border border-gray-200 rounded-xl text-sm"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={newCard.expiry}
                  onChange={(e) => setNewCard({...newCard, expiry: e.target.value})}
                  className="p-3 border border-gray-200 rounded-xl text-sm"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={newCard.cvv}
                  onChange={(e) => setNewCard({...newCard, cvv: e.target.value})}
                  className="p-3 border border-gray-200 rounded-xl text-sm"
                />
              </div>
              <input
                type="text"
                placeholder="Cardholder Name"
                value={newCard.name}
                onChange={(e) => setNewCard({...newCard, name: e.target.value})}
                className="w-full p-3 border border-gray-200 rounded-xl text-sm"
              />
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddCard(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium"
              >
                Cancel
              </button>
              <button
                onClick={addCard}
                className="flex-1 py-3 text-white rounded-xl font-medium"
                style={{ backgroundColor: '#072415' }}
              >
                Add Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}