
'use client';

export default function CategoryTabs() {
  const activeTab = 'Home';
  
  const categories = [
    'Home', 'Fashion', 'Beauty', 'Electronics', 'Sports', 'Kids', 'Books', 'Health'
  ];

  return (
    <div className="bg-white px-4 py-3 border-b border-gray-100">
      <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === category
                ? 'text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            style={activeTab === category ? { backgroundColor: '#072415' } : {}}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
