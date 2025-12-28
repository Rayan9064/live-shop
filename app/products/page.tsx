'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import { productApi } from '@/lib/api';
import ProductGrid from '@/components/ProductGrid';
import BottomTabBar from '@/components/BottomTabBar';
import TopNavigation from '@/components/TopNavigation';

const categories = [
    { id: 'all', label: 'All', icon: 'ri-apps-line' },
    { id: 'electronics', label: 'Electronics', icon: 'ri-smartphone-line' },
    { id: 'fashion', label: 'Fashion', icon: 'ri-shirt-line' },
    { id: 'beauty', label: 'Beauty', icon: 'ri-heart-pulse-line' },
    { id: 'home', label: 'Home', icon: 'ri-home-line' },
    { id: 'sports', label: 'Sports', icon: 'ri-basketball-line' },
    { id: 'collectibles', label: 'Collectibles', icon: 'ri-trophy-line' },
];

const sortOptions = [
    { id: 'newest', label: 'Newest First' },
    { id: 'price_low', label: 'Price: Low to High' },
    { id: 'price_high', label: 'Price: High to Low' },
    { id: 'rating', label: 'Top Rated' },
];

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedSort, setSelectedSort] = useState('newest');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await productApi.getAll({
                category: selectedCategory === 'all' ? undefined : selectedCategory,
                limit: 50,
            });
            setProducts(Array.isArray(data) ? data : []);
        } catch (err: any) {
            console.error('Error fetching products:', err);
            setError(err.message || 'Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const getFilteredAndSortedProducts = () => {
        let filtered = [...products];

        // Apply search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (product) =>
                    product.name.toLowerCase().includes(query) ||
                    product.description.toLowerCase().includes(query) ||
                    product.category.toLowerCase().includes(query)
            );
        }

        // Apply sorting
        switch (selectedSort) {
            case 'price_low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price_high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            case 'newest':
            default:
                // Already sorted by newest from API
                break;
        }

        return filtered;
    };

    const filteredProducts = getFilteredAndSortedProducts();

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <TopNavigation />

            {/* Header */}
            <div className="bg-white border-b border-gray-100 px-4 py-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Shop Products</h1>

                {/* Search Bar */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 pl-12 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <i className="ri-close-circle-fill text-xl"></i>
                        </button>
                    )}
                </div>
            </div>

            {/* Category Tabs */}
            <div className="bg-white border-b border-gray-100 px-4 py-3 overflow-x-auto">
                <div className="flex space-x-2">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === category.id
                                    ? 'bg-red-500 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            <i className={`${category.icon} text-base`}></i>
                            <span>{category.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Sort Options */}
            <div className="bg-white border-b border-gray-100 px-4 py-3">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                        {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                    </span>
                    <select
                        value={selectedSort}
                        onChange={(e) => setSelectedSort(e.target.value)}
                        className="text-sm text-gray-700 bg-transparent border-none focus:outline-none cursor-pointer"
                    >
                        {sortOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Products Grid */}
            <div className="px-4 py-4">
                <ProductGrid products={filteredProducts} loading={loading} error={error} />
            </div>

            <BottomTabBar />
        </div>
    );
}
