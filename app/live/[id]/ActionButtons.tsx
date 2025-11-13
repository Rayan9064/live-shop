
'use client';

import { useState } from 'react';

interface ActionButtonsProps {
  onLike: () => void;
}

export default function ActionButtons({ onLike }: ActionButtonsProps) {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    onLike();
  };

  return (
    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
      <button
        onClick={handleLike}
        className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-all ${liked ? 'bg-red-500' : 'bg-black/30'
          }`}
      >
        <i className={`ri-heart-${liked ? 'fill' : 'line'} text-white text-xl`}></i>
      </button>

      <button className="w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center">
        <i className="ri-gift-line text-white text-xl"></i>
      </button>

      <button className="w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center">
        <i className="ri-share-line text-white text-xl"></i>
      </button>

      <button className="w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center">
        <i className="ri-scissors-cut-line text-white text-xl"></i>
      </button>

      <button className="w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center">
        <i className="ri-wallet-line text-white text-xl"></i>
      </button>
    </div>
  );
}
