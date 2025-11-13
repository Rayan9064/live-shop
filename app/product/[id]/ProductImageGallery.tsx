'use client';

import { useState } from 'react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="pt-16 pb-4">
      <div className="relative">
        <img 
          src={images[currentImage]}
          alt={productName}
          className="w-full h-96 object-cover object-top rounded-lg"
        />
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentImage ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
      
      <div className="flex space-x-2 mt-3 px-4 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
              index === currentImage ? 'border-red-500' : 'border-gray-200'
            }`}
          >
            <img 
              src={image}
              alt={`${productName} ${index + 1}`}
              className="w-full h-full object-cover object-top"
            />
          </button>
        ))}
      </div>
    </div>
  );
}