
'use client';

interface ProductCardProps {
  product: {
    image: string;
    name: string;
    price: string;
    originalPrice: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="mx-4 mb-3">
      <div className="bg-black/40 backdrop-blur-md rounded-2xl p-3 border border-white/10">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 rounded-xl object-cover border border-white/20"
            />
            <div className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs font-bold px-1.5 py-0.5 rounded-full">
              50% OFF
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-white font-semibold text-sm mb-1">{product.name}</h3>
            <div className="flex items-center space-x-2">
              <span className="text-white font-bold text-lg">{product.price}</span>
              <span className="text-white/60 line-through text-sm">{product.originalPrice}</span>
            </div>
          </div>
          
          <button className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-full text-sm hover:bg-yellow-500 transition-colors">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
