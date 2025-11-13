'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AddressesPage() {
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      name: 'Sarah Johnson',
      address: '123 Main Street, Apt 4B',
      city: 'New York, NY 10001',
      phone: '+1 (555) 123-4567',
      isDefault: true
    },
    {
      id: 2,
      type: 'Work',
      name: 'Sarah Johnson',
      address: '456 Business Ave, Suite 200',
      city: 'New York, NY 10005',
      phone: '+1 (555) 987-6543',
      isDefault: false
    }
  ]);

  const [newAddress, setNewAddress] = useState({
    type: 'Home',
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });

  const addAddress = () => {
    const address = {
      id: Date.now(),
      type: newAddress.type,
      name: newAddress.name,
      address: newAddress.address,
      city: `${newAddress.city}, ${newAddress.state} ${newAddress.zipCode}`,
      phone: newAddress.phone,
      isDefault: addresses.length === 0
    };
    setAddresses([...addresses, address]);
    setShowAddAddress(false);
    setNewAddress({ type: 'Home', name: '', address: '', city: '', state: '', zipCode: '', phone: '' });
  };

  const removeAddress = (id: number) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const setDefaultAddress = (id: number) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
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
            <h1 className="text-lg font-bold text-gray-900">Addresses</h1>
          </div>
          <button
            onClick={() => setShowAddAddress(true)}
            className="text-sm font-medium"
            style={{ color: '#072415' }}
          >
            Add New
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="pt-16 pb-20 px-4">
        <div className="space-y-4">
          {addresses.map((address) => (
            <div key={address.id} className="bg-white rounded-2xl p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {address.type}
                  </span>
                  {address.isDefault && (
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <button
                  onClick={() => removeAddress(address.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <i className="ri-delete-bin-line text-lg"></i>
                </button>
              </div>
              
              <div className="mb-4">
                <p className="font-medium text-gray-900">{address.name}</p>
                <p className="text-sm text-gray-600 mt-1">{address.address}</p>
                <p className="text-sm text-gray-600">{address.city}</p>
                <p className="text-sm text-gray-600">{address.phone}</p>
              </div>
              
              <div className="flex space-x-3">
                <button className="text-sm font-medium" style={{ color: '#072415' }}>
                  Edit
                </button>
                {!address.isDefault && (
                  <button
                    onClick={() => setDefaultAddress(address.id)}
                    className="text-sm font-medium text-gray-600"
                  >
                    Set as Default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddAddress && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white rounded-t-3xl p-6 w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Add New Address</h3>
              <button onClick={() => setShowAddAddress(false)}>
                <i className="ri-close-line text-xl text-gray-600"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Address Type</label>
                <select
                  value={newAddress.type}
                  onChange={(e) => setNewAddress({...newAddress, type: e.target.value})}
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm"
                >
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Full Name</label>
                <input
                  type="text"
                  value={newAddress.name}
                  onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm"
                  placeholder="Enter full name"
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Street Address</label>
                <input
                  type="text"
                  value={newAddress.address}
                  onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm"
                  placeholder="Enter street address"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">City</label>
                  <input
                    type="text"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">State</label>
                  <input
                    type="text"
                    value={newAddress.state}
                    onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm"
                    placeholder="State"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm text-gray-500 mb-1 block">ZIP Code</label>
                <input
                  type="text"
                  value={newAddress.zipCode}
                  onChange={(e) => setNewAddress({...newAddress, zipCode: e.target.value})}
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm"
                  placeholder="ZIP Code"
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Phone Number</label>
                <input
                  type="tel"
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm"
                  placeholder="Phone number"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddAddress(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium"
              >
                Cancel
              </button>
              <button
                onClick={addAddress}
                className="flex-1 py-3 text-white rounded-xl font-medium"
                style={{ backgroundColor: '#072415' }}
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}