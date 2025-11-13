
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ChatFeed from './ChatFeed';
import ActionButtons from './ActionButtons';
import ProductCard from './ProductCard';
import StreamHeader from './StreamHeader';

interface LiveStreamInterfaceProps {
  streamId: string;
}

export default function LiveStreamInterface({ streamId }: LiveStreamInterfaceProps) {
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(false);
  const [heartAnimation, setHeartAnimation] = useState<number[]>([]);

  const streamData = {
    '1': {
      title: 'Summer Fashion Haul - 50% OFF Everything!',
      streamer: 'Sarah Johnson',
      username: 'sarahstyle',
      rating: 4.9,
      viewers: 2847,
      background: 'https://readdy.ai/api/search-image?query=Fashion%20live%20streaming%20setup%20with%20clothing%20rack%2C%20natural%20lighting%2C%20modern%20bedroom%20background%2C%20young%20woman%20presenting%20summer%20clothes%2C%20professional%20streaming%20equipment%2C%20bright%20and%20cheerful%20atmosphere%2C%20high%20quality%20photography&width=375&height=812&seq=stream-bg-1&orientation=portrait',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20young%20woman%20with%20brown%20hair%2C%20friendly%20smile%2C%20modern%20portrait%20photography%20style%2C%20clean%20background%2C%20high%20quality&width=50&height=50&seq=avatar1&orientation=squarish',
      product: {
        image: 'https://readdy.ai/api/search-image?query=Stylish%20summer%20dress%20on%20hanger%2C%20fashion%20photography%2C%20clean%20white%20background%2C%20trendy%20clothing%20item%2C%20high%20quality%20product%20shot&width=80&height=80&seq=product-1&orientation=squarish',
        name: 'Summer Floral Dress',
        price: '$29.99',
        originalPrice: '$59.99'
      }
    },
    '2': {
      title: 'Gaming Setup Review - Latest Tech Gear',
      streamer: 'Alex Chen',
      username: 'techguru',
      rating: 4.8,
      viewers: 1523,
      background: 'https://readdy.ai/api/search-image?query=Gaming%20setup%20live%20stream%2C%20RGB%20lighting%2C%20multiple%20monitors%2C%20gaming%20chair%2C%20modern%20desk%20setup%2C%20tech%20equipment%2C%20dark%20gaming%20room%20ambiance%2C%20professional%20streaming%20quality&width=375&height=812&seq=stream-bg-2&orientation=portrait',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20young%20Asian%20man%20with%20glasses%2C%20friendly%20expression%2C%20modern%20portrait%20photography%2C%20clean%20background%2C%20high%20quality&width=50&height=50&seq=avatar2&orientation=squarish',
      product: {
        image: 'https://readdy.ai/api/search-image?query=Gaming%20headset%20product%20shot%2C%20professional%20photography%2C%20black%20background%2C%20high-end%20gaming%20equipment%2C%20sleek%20design&width=80&height=80&seq=product-2&orientation=squarish',
        name: 'Pro Gaming Headset',
        price: '$199.99',
        originalPrice: '$299.99'
      }
    },
    '3': {
      title: 'Jordan Sneaker Authentication - Rare Finds',
      streamer: 'Sneaker King',
      username: 'sneakerking',
      rating: 4.9,
      viewers: 6234,
      background: 'https://readdy.ai/api/search-image?query=Sneaker%20authentication%20setup%2C%20Jordan%20collection%20display%2C%20urban%20streetwear%20background%2C%20professional%20lighting%2C%20sneaker%20boxes%2C%20authentication%20tools%2C%20modern%20studio%20environment&width=375&height=812&seq=stream-bg-3&orientation=portrait',
      avatar: 'https://readdy.ai/api/search-image?query=Young%20sneaker%20enthusiast%20man%20portrait%2C%20confident%20smile%2C%20urban%20style%2C%20sneaker%20collection%20background%2C%20high%20quality%20headshot%2C%20modern%20lighting&width=50&height=50&seq=host-avatar-sneaker&orientation=squarish',
      product: {
        image: 'https://readdy.ai/api/search-image?query=Air%20Jordan%20sneakers%20product%20shot%2C%20premium%20basketball%20shoes%2C%20clean%20white%20background%2C%20high%20quality%20product%20photography%2C%20authentic%20sneaker&width=80&height=80&seq=product-3&orientation=squarish',
        name: 'Air Jordan Retro 1',
        price: '$179.99',
        originalPrice: '$220.00'
      }
    }
  };

  const currentStream = streamData[streamId as keyof typeof streamData] || streamData['1'];

  const handleLike = () => {
    const id = Date.now();
    setHeartAnimation(prev => [...prev, id]);
    setTimeout(() => {
      setHeartAnimation(prev => prev.filter(heartId => heartId !== id));
    }, 2000);
  };

  const handleExit = () => {
    router.back();
  };

  return (
    <div className="fixed inset-0 bg-black">
      <div className="relative w-full h-full">
        <img
          src={currentStream.background}
          alt="Live Stream"
          className="w-full h-full object-cover object-center"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40">
          <StreamHeader
            streamer={currentStream.streamer}
            username={currentStream.username}
            rating={currentStream.rating}
            avatar={currentStream.avatar}
            viewers={currentStream.viewers}
            isFollowing={isFollowing}
            setIsFollowing={setIsFollowing}
            onExit={handleExit}
          />
          
          <ActionButtons onLike={handleLike} />
          
          <div className="absolute bottom-0 left-0 right-0">
            <ProductCard product={currentStream.product} />
            <ChatFeed />
          </div>
          
          {heartAnimation.map((id) => (
            <div
              key={id}
              className="absolute right-20 bottom-40 animate-ping pointer-events-none"
              style={{
                animationDuration: '2s',
                animationFillMode: 'forwards'
              }}
            >
              <i className="ri-heart-fill text-red-500 text-3xl animate-bounce"></i>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
