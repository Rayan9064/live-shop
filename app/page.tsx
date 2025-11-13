
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import BottomTabBar from '../components/BottomTabBar';

export default function HomePage() {
  const router = useRouter();
  const [currentStreamIndex, setCurrentStreamIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const liveStreams = [
    {
      id: '1',
      title: 'Jordan Sneaker Authentication & Reviews',
      host: 'Sneaker King',
      hostAvatar: 'https://readdy.ai/api/search-image?query=Young%20sneaker%20enthusiast%20man%20portrait%2C%20confident%20smile%2C%20urban%20style%2C%20sneaker%20collection%20background%2C%20high%20quality%20headshot%2C%20modern%20lighting&width=50&height=50&seq=host-avatar-sneaker&orientation=squarish',
      viewers: 6234,
      followers: 92000,
      background: 'https://readdy.ai/api/search-image?query=Sneaker%20authentication%20setup%2C%20Jordan%20collection%20display%2C%20urban%20streetwear%20background%2C%20professional%20lighting%2C%20sneaker%20boxes%2C%20authentication%20tools%2C%20modern%20studio%20environment&width=375&height=812&seq=stream-bg-sneaker&orientation=portrait',
      category: 'Sneakers',
      product: {
        image: 'https://readdy.ai/api/search-image?query=Air%20Jordan%20sneakers%20product%20shot%2C%20premium%20basketball%20shoes%2C%20clean%20white%20background%2C%20high%20quality%20product%20photography%2C%20authentic%20sneaker&width=80&height=80&seq=product-sneaker&orientation=squarish',
        name: 'Air Jordan Retro 1',
        price: '$179.99',
        originalPrice: '$220.00'
      }
    },
    {
      id: '2',
      title: 'Rare Pokemon Cards Unboxing & Trading',
      host: 'CardMaster Jake',
      hostAvatar: 'https://readdy.ai/api/search-image?query=Young%20male%20pokemon%20card%20collector%20portrait%2C%20excited%20expression%2C%20gaming%20setup%20background%2C%20casual%20attire%2C%20high%20quality%20headshot%2C%20natural%20lighting&width=50&height=50&seq=host-avatar-pokemon&orientation=squarish',
      viewers: 4521,
      followers: 78000,
      background: 'https://readdy.ai/api/search-image?query=Pokemon%20trading%20cards%20collection%20display%2C%20holographic%20cards%2C%20booster%20packs%2C%20card%20sleeves%2C%20gaming%20table%20setup%2C%20bright%20colorful%20lighting%2C%20collector%20atmosphere&width=375&height=812&seq=stream-bg-pokemon&orientation=portrait',
      category: 'Collectibles',
      product: {
        image: 'https://readdy.ai/api/search-image?query=Holographic%20Pokemon%20card%2C%20Charizard%20trading%20card%2C%20premium%20quality%2C%20clean%20background%2C%20collectible%20card%20photography&width=80&height=80&seq=product-pokemon&orientation=squarish',
        name: 'Charizard Holographic',
        price: '$299.99',
        originalPrice: '$399.99'
      }
    },
    {
      id: '3',
      title: 'Vintage Fashion Finds & Styling Tips',
      host: 'Vintage Vera',
      hostAvatar: 'https://readdy.ai/api/search-image?query=Stylish%20woman%20portrait%2C%20vintage%20fashion%20enthusiast%2C%20retro%20styling%2C%20warm%20smile%2C%20boutique%20background%2C%20high%20quality%20headshot%2C%20soft%20lighting&width=50&height=50&seq=host-avatar-vintage&orientation=squarish',
      viewers: 2847,
      followers: 45000,
      background: 'https://readdy.ai/api/search-image?query=Vintage%20clothing%20collection%2C%20retro%20dresses%2C%20classic%20accessories%2C%20antique%20wardrobe%2C%20warm%20nostalgic%20lighting%2C%20fashion%20boutique%20atmosphere&width=375&height=812&seq=stream-bg-vintage&orientation=portrait',
      category: 'Fashion',
      product: {
        image: 'https://readdy.ai/api/search-image?query=Vintage%20dress%20on%20hanger%2C%20retro%20fashion%2C%20classic%20style%2C%20boutique%20photography%2C%20elegant%20presentation&width=80&height=80&seq=product-vintage&orientation=squarish',
        name: 'Vintage Silk Dress',
        price: '$89.99',
        originalPrice: '$149.99'
      }
    },
    {
      id: '4',
      title: 'Tech Gadgets Flash Sale Event',
      host: 'Tech Guru Mike',
      hostAvatar: 'https://readdy.ai/api/search-image?query=Tech%20reviewer%20man%20portrait%2C%20modern%20style%2C%20technology%20background%2C%20enthusiastic%20expression%2C%20high%20quality%20headshot%2C%20bright%20lighting&width=50&height=50&seq=host-avatar-tech&orientation=squarish',
      viewers: 5789,
      followers: 115000,
      background: 'https://readdy.ai/api/search-image?query=Modern%20tech%20gadgets%20display%2C%20smartphones%20tablets%20laptops%2C%20high-tech%20setup%2C%20futuristic%20lighting%2C%20technology%20showcase&width=375&height=812&seq=stream-bg-tech&orientation=portrait',
      category: 'Electronics',
      product: {
        image: 'https://readdy.ai/api/search-image?query=Latest%20smartphone%20product%20shot%2C%20modern%20technology%2C%20sleek%20design%2C%20professional%20photography%2C%20clean%20background&width=80&height=80&seq=product-tech&orientation=squarish',
        name: 'Latest Smartphone',
        price: '$699.99',
        originalPrice: '$899.99'
      }
    },
    {
      id: '5',
      title: 'Beauty Products & Makeup Tutorials',
      host: 'Beauty Bella',
      hostAvatar: 'https://readdy.ai/api/search-image?query=Beauty%20influencer%20woman%20portrait%2C%20radiant%20smile%2C%20makeup%20studio%20background%2C%20glamorous%20style%2C%20high%20quality%20headshot%2C%20perfect%20lighting&width=50&height=50&seq=host-avatar-beauty&orientation=squarish',
      viewers: 4321,
      followers: 89000,
      background: 'https://readdy.ai/api/search-image?query=Beauty%20products%20collection%2C%20makeup%20palettes%2C%20skincare%20items%2C%20beauty%20studio%20setup%2C%20elegant%20lighting%2C%20glamorous%20atmosphere&width=375&height=812&seq=stream-bg-beauty&orientation=portrait',
      category: 'Beauty',
      product: {
        image: 'https://readdy.ai/api/search-image?query=Luxury%20makeup%20palette%2C%20beauty%20products%2C%20cosmetics%20photography%2C%20elegant%20presentation%2C%20premium%20quality&width=80&height=80&seq=product-beauty&orientation=squarish',
        name: 'Pro Makeup Palette',
        price: '$49.99',
        originalPrice: '$79.99'
      }
    }
  ];

  const currentStream = liveStreams[currentStreamIndex];

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (isScrolling) return;
    
    const deltaY = touchStartY.current - touchEndY.current;
    const threshold = 50;

    if (Math.abs(deltaY) > threshold) {
      setIsScrolling(true);
      
      if (deltaY > 0 && currentStreamIndex < liveStreams.length - 1) {
        setCurrentStreamIndex(prev => prev + 1);
      } else if (deltaY < 0 && currentStreamIndex > 0) {
        setCurrentStreamIndex(prev => prev - 1);
      }
      
      setTimeout(() => setIsScrolling(false), 500);
    }
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (isScrolling) return;

    setIsScrolling(true);
    
    if (e.deltaY > 0 && currentStreamIndex < liveStreams.length - 1) {
      setCurrentStreamIndex(prev => prev + 1);
    } else if (e.deltaY < 0 && currentStreamIndex > 0) {
      setCurrentStreamIndex(prev => prev - 1);
    }
    
    setTimeout(() => setIsScrolling(false), 500);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [currentStreamIndex, isScrolling]);

  const handleStreamClick = () => {
    router.push(`/live/${currentStream.id}`);
  };

  const formatViewers = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-black overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className="relative w-full h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateY(-${currentStreamIndex * 100}vh)` }}
      >
        {liveStreams.map((stream, index) => (
          <div
            key={stream.id}
            className="absolute inset-0 w-full h-full"
            style={{ top: `${index * 100}vh` }}
            onClick={handleStreamClick}
          >
            <img
              src={stream.background}
              alt={stream.title}
              className="w-full h-full object-cover object-center"
            />
            
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60">
              {/* Top Header */}
              <div className="absolute top-0 left-0 right-0 pt-12 px-4 z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={stream.hostAvatar}
                      alt={stream.host}
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                    <div>
                      <p className="text-white font-semibold text-sm">{stream.host}</p>
                      <p className="text-white/80 text-xs">{formatViewers(stream.followers)} followers</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="bg-red-500 px-2 py-1 rounded-full flex items-center space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-white text-xs font-medium">LIVE</span>
                    </div>
                    <div className="bg-black/50 px-2 py-1 rounded-full">
                      <span className="text-white text-xs">{formatViewers(stream.viewers)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side Actions */}
              <div className="absolute right-4 bottom-32 flex flex-col space-y-4 z-10">
                <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <i className="ri-heart-line text-white text-xl"></i>
                </button>
                <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <i className="ri-chat-3-line text-white text-xl"></i>
                </button>
                <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <i className="ri-share-line text-white text-xl"></i>
                </button>
                <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <i className="ri-bookmark-line text-white text-xl"></i>
                </button>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-20 left-0 right-0 px-4 z-10">
                <div className="mb-4">
                  <h3 className="text-white font-semibold text-lg mb-2">{stream.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs">
                      #{stream.category}
                    </span>
                  </div>
                </div>

                {/* Product Card */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 flex items-center space-x-3">
                  <img
                    src={stream.product.image}
                    alt={stream.product.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm">{stream.product.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-red-500 font-bold text-lg">{stream.product.price}</span>
                      <span className="text-gray-500 line-through text-sm">{stream.product.originalPrice}</span>
                    </div>
                  </div>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-xl font-medium text-sm">
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Stream Indicators */}
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col space-y-1 z-10">
                {liveStreams.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1 h-8 rounded-full transition-all duration-300 ${
                      index === currentStreamIndex ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomTabBar />
    </div>
  );
}
