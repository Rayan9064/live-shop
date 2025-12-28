'use client';

import { useRouter } from 'next/navigation';
import { Product } from '@/lib/types';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/product/${product.id}`);
    };

    const discountPercentage = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <div
            onClick={handleClick}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
            {/* Product Image */}
            <div className="relative aspect-square bg-gray-100">
                <img
                    src={product.images[0] || '/placeholder-product.png'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.currentTarget.src = '/placeholder-product.png';
                    }}
                />

                {/* Discount Badge */}
                {discountPercentage > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        -{discountPercentage}%
                    </div>
                )}

                {/* Stock Badge */}
                {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">Out of Stock</span>
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-3">
                {/* Product Name */}
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                    {product.name}
                </h3>

                {/* Seller */}
                <p className="text-xs text-gray-500 mb-2">{product.sellerName}</p>

                {/* Price */}
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-gray-900">
                        ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                            ₹{product.originalPrice.toLocaleString()}
                        </span>
                    )}
                </div>

                {/* Rating & Reviews */}
                {product.rating && product.rating > 0 && (
                    <div className="flex items-center gap-1 mb-2">
                        <div className="flex items-center">
                            <i className="ri-star-fill text-yellow-400 text-sm"></i>
                            <span className="text-sm font-medium text-gray-700 ml-1">
                                {product.rating.toFixed(1)}
                            </span>
                        </div>
                        {product.reviews && product.reviews > 0 && (
                            <span className="text-xs text-gray-500">
                                ({product.reviews.toLocaleString()})
                            </span>
                        )}
                    </div>
                )}

                {/* Shipping Info */}
                {product.shipping.free && (
                    <div className="flex items-center gap-1 text-xs text-green-600">
                        <i className="ri-truck-line"></i>
                        <span>Free Delivery</span>
                    </div>
                )}
            </div>
        </div>
    );
}
