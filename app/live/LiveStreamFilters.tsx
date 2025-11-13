
'use client';

import { useState } from 'react';

export default function LiveStreamFilters() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Popular');

  const categories = [
    'All', 'Collectibles', 'Fashion', 'Sneakers', 'Comics', 
    'Watches', 'Art', 'Electronics', 'Beauty'
  ];

  const sortOptions = ['Popular', 'Recent', 'Most Viewers', 'Trending'];

  return (
    <div className="bg-white px-4 py-3 border-b border-gray-100">
      <div className="space-y-3">
        <div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {sortOptions.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedSort(option)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedSort === option
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
