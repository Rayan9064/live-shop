'use client';

interface ShopHeaderProps {
  onFilterClick: () => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function ShopHeader({ onFilterClick, sortBy, onSortChange }: ShopHeaderProps) {
  const sortOptions = ['Popular', 'Price: Low to High', 'Price: High to Low', 'Newest', 'Best Rating'];

  return (
    <div className="bg-white px-4 py-3 border-b border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-bold text-gray-900">Shop</h1>
        <div className="flex items-center space-x-3">
          <button 
            onClick={onFilterClick}
            className="flex items-center space-x-1 px-3 py-2 bg-gray-100 rounded-lg"
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-filter-line text-gray-600"></i>
            </div>
            <span className="text-sm text-gray-600">Filter</span>
          </button>
          
          <div className="relative">
            <select 
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-gray-100 rounded-lg px-3 py-2 pr-8 text-sm text-gray-600 border-none focus:outline-none focus:ring-2 focus:ring-red-200"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 flex items-center justify-center pointer-events-none">
              <i className="ri-arrow-down-s-line text-gray-400"></i>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-sm text-gray-500">
        2,847 products found
      </div>
    </div>
  );
}