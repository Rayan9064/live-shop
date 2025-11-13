'use client';

import { useState } from 'react';

interface SellerProfileProps {
  seller: {
    id: string;
    name: string;
    avatar: string;
    coverImage: string;
    rating: number;
    followers: string;
    following: string;
    products: number;
    description: string;
    location: string;
    joinDate: string;
    verified: boolean;
    responseTime: string;
    responseRate: string;
  };
}

export default function SellerProfile({ seller }: SellerProfileProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="pt-16">
      <div className="relative">
        <img 
          src={seller.coverImage}
          alt={`${seller.name} cover`}
          className="w-full h-48 object-cover object-top"
        />
        
        <div className="absolute -bottom-12 left-4">
          <div className="relative">
            <img 
              src={seller.avatar}
              alt={seller.name}
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
            {seller.verified && (
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-check-line text-white text-sm"></i>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="px-4 pt-16 pb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900 mb-1">{seller.name}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
              <div className="flex items-center">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-map-pin-line"></i>
                </div>
                <span className="ml-1">{seller.location}</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-calendar-line"></i>
                </div>
                <span className="ml-1">Joined {seller.joinDate}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{seller.followers}</div>
                <div className="text-xs text-gray-500">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{seller.following}</div>
                <div className="text-xs text-gray-500">Following</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{seller.products}</div>
                <div className="text-xs text-gray-500">Products</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{seller.rating}</div>
                <div className="text-xs text-gray-500 flex items-center">
                  <div className="w-3 h-3 flex items-center justify-center">
                    <i className="ri-star-fill text-yellow-400"></i>
                  </div>
                  <span className="ml-1">Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-3 mb-6">
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`flex-1 py-3 rounded-lg font-medium ${
              isFollowing
                ? 'bg-gray-100 text-gray-700'
                : 'bg-red-500 text-white'
            }`}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
          
          <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium">
            Message
          </button>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
          <h3 className="font-medium text-gray-900 mb-2">About</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {seller.description}
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-500 mb-1">Response Time</div>
              <div className="font-medium text-gray-900">{seller.responseTime}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-500 mb-1">Response Rate</div>
              <div className="font-medium text-gray-900">{seller.responseRate}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}