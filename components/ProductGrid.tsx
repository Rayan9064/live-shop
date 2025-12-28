'use client';

import { Product } from '@/lib/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
    products: Product[];
    loading?: boolean;
    error?: string | null;
}

export default function ProductGrid({ products, loading, error }: ProductGridProps) {
    // Loading skeleton
    if (loading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, index) => (
                    <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
                        <div className="aspect-square bg-gray-200"></div>
                        <div className="p-3 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <i className="ri-error-warning-line text-6xl text-red-500 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Oops! Something went wrong
                </h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    // Empty state
    if (!products || products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <i className="ri-shopping-bag-line text-6xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No products found
                </h3>
                <p className="text-gray-600">
                    Try adjusting your filters or check back later
                </p>
            </div>
        );
    }

    // Product grid
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
