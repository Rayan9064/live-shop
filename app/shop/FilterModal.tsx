'use client';

import { useState } from 'react';

interface FilterModalProps {
  onClose: () => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function FilterModal({ 
  onClose, 
  selectedCategory, 
  onCategoryChange, 
  sortBy, 
  onSortChange 
}: FilterModalProps) {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState(0);

  const categories = [
    'All', 'Electronics', 'Fashion', 'Beauty', 'Home & Garden', 
    'Sports', 'Books', 'Toys', 'Health'
  ];

  const brands = [
    'Apple', 'Samsung', 'Nike', 'Adidas', 'Zara', 'H&M', 
    'Sony', 'Canon', 'Dell', 'HP'
  ];

  const sortOptions = [
    'Popular', 'Price: Low to High', 'Price: High to Low', 
    'Newest', 'Best Rating'
  ];

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const clearFilters = () => {
    onCategoryChange('All');
    onSortChange('Popular');
    setPriceRange([0, 500]);
    setSelectedBrands([]);
    setSelectedRating(0);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full max-h-[80vh] rounded-t-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Filters</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-close-line text-gray-600 text-xl"></i>
            </div>
          </button>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(80vh-120px)]">
          <div className="p-4 space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={`px-3 py-2 rounded-full text-sm font-medium ${
                      selectedCategory === category
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${(priceRange[1]/500)*100}%, #e5e7eb ${(priceRange[1]/500)*100}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>$0</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Brand</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="opacity-0 absolute"
                    />
                    <div className={`w-5 h-5 border-2 rounded flex items-center justify-center mr-3 ${
                      selectedBrands.includes(brand) 
                        ? 'bg-red-500 border-red-500' 
                        : 'border-gray-300'
                    }`}>
                      {selectedBrands.includes(brand) && (
                        <div className="w-3 h-3 flex items-center justify-center">
                          <i className="ri-check-line text-white text-xs"></i>
                        </div>
                      )}
                    </div>
                    <span className="text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Minimum Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setSelectedRating(rating)}
                    className={`flex items-center w-full p-2 rounded-lg ${
                      selectedRating === rating ? 'bg-red-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-4 h-4 flex items-center justify-center">
                          <i className={`ri-star-${i < rating ? 'fill' : 'line'} text-yellow-400 text-sm`}></i>
                        </div>
                      ))}
                      <span className="ml-2 text-gray-700">{rating}+ stars</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Sort By</h3>
              <div className="space-y-2">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => onSortChange(option)}
                    className={`flex items-center justify-between w-full p-3 rounded-lg ${
                      sortBy === option ? 'bg-red-50 border border-red-200' : 'bg-gray-50'
                    }`}
                  >
                    <span className={`${sortBy === option ? 'text-red-600' : 'text-gray-700'}`}>
                      {option}
                    </span>
                    {sortBy === option && (
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-check-line text-red-600"></i>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex space-x-3">
            <button 
              onClick={clearFilters}
              className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium"
            >
              Clear All
            </button>
            <button 
              onClick={onClose}
              className="flex-1 py-3 bg-red-500 text-white rounded-lg font-medium"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}