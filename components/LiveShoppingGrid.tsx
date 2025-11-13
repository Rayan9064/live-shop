
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const liveStreams = [
  {
    id: 3,
    title: "Jordan Sneaker Authentication",
    host: "Sneaker King",
    viewers: 6234,
    thumbnail: "https://readdy.ai/api/search-image?query=Air%20Jordan%20sneakers%20collection%2C%20multiple%20colorways%2C%20sneaker%20boxes%2C%20authentication%20tools%2C%20urban%20streetwear%20setup%2C%20dynamic%20lighting%2C%20vertical%20composition&width=160&height=200&seq=sneaker-stream&orientation=portrait",
    hostAvatar: "https://readdy.ai/api/search-image?query=Young%20sneaker%20enthusiast%20man%20portrait%2C%20confident%20smile%2C%20urban%20style%2C%20sneaker%20collection%20background%2C%20high%20quality%20headshot%2C%20modern%20lighting&width=32&height=32&seq=host-avatar-sneaker&orientation=squarish"
  },
  {
    id: 1,
    title: "Pokemon Cards Unboxing",
    host: "CardMaster Jake",
    viewers: 4521,
    thumbnail: "https://readdy.ai/api/search-image?query=Pokemon%20trading%20cards%20collection%20display%2C%20holographic%20cards%2C%20booster%20packs%2C%20card%20sleeves%2C%20gaming%20table%20setup%2C%20bright%20colorful%20lighting%2C%20collector%20atmosphere%2C%20vertical%20composition&width=160&height=200&seq=pokemon-stream&orientation=portrait",
    hostAvatar: "https://readdy.ai/api/search-image?query=Young%20male%20pokemon%20card%20collector%20portrait%2C%20excited%20expression%2C%20gaming%20setup%20background%2C%20casual%20attire%2C%20high%20quality%20headshot%2C%20natural%20lighting&width=32&height=32&seq=host-avatar-pokemon&orientation=squarish"
  },
  {
    id: 2,
    title: "Vintage Fashion Finds",
    host: "Vintage Vera",
    viewers: 2847,
    thumbnail: "https://readdy.ai/api/search-image?query=Vintage%20clothing%20collection%2C%20retro%20dresses%2C%20classic%20accessories%2C%20antique%20wardrobe%2C%20warm%20nostalgic%20lighting%2C%20fashion%20boutique%20atmosphere%2C%20vertical%20composition&width=160&height=200&seq=vintage-stream&orientation=portrait",
    hostAvatar: "https://readdy.ai/api/search-image?query=Stylish%20woman%20portrait%2C%20vintage%20fashion%20enthusiast%2C%20retro%20styling%2C%20warm%20smile%2C%20boutique%20background%2C%20high%20quality%20headshot%2C%20soft%20lighting&width=32&height=32&seq=host-avatar-vintage&orientation=squarish"
  },
  {
    id: 4,
    title: "Comic Book Grading",
    host: "Comic Curator",
    viewers: 1923,
    thumbnail: "https://readdy.ai/api/search-image?query=Vintage%20comic%20books%20collection%2C%20superhero%20comics%2C%20grading%20supplies%2C%20comic%20book%20store%20atmosphere%2C%20colorful%20covers%2C%20organized%20display%2C%20vertical%20composition&width=160&height=200&seq=comic-stream&orientation=portrait",
    hostAvatar: "https://readdy.ai/api/search-image?query=Comic%20book%20expert%20man%20portrait%2C%20glasses%2C%20friendly%20expression%2C%20comic%20store%20background%2C%20casual%20attire%2C%20high%20quality%20headshot%2C%20warm%20lighting&width=32&height=32&seq=host-avatar-comic&orientation=squarish"
  },
  {
    id: 5,
    title: "Tech Gadget Reviews",
    host: "Tech Guru",
    viewers: 3456,
    thumbnail: "https://readdy.ai/api/search-image?query=Modern%20tech%20gadgets%20display%2C%20smartphones%2C%20headphones%2C%20smart%20devices%2C%20clean%20tech%20setup%2C%20professional%20lighting%2C%20futuristic%20atmosphere%2C%20vertical%20composition&width=160&height=200&seq=tech-stream&orientation=portrait",
    hostAvatar: "https://readdy.ai/api/search-image?query=Tech%20reviewer%20man%20portrait%2C%20modern%20glasses%2C%20professional%20setup%2C%20tech%20background%2C%20confident%20expression%2C%20high%20quality%20headshot%2C%20clean%20lighting&width=32&height=32&seq=host-avatar-tech&orientation=squarish"
  },
  {
    id: 6,
    title: "Beauty Product Testing",
    host: "Beauty Belle",
    viewers: 5678,
    thumbnail: "https://readdy.ai/api/search-image?query=Beauty%20products%20collection%2C%20makeup%20palettes%2C%20skincare%20items%2C%20cosmetic%20brushes%2C%20elegant%20vanity%20setup%2C%20soft%20pink%20lighting%2C%20luxurious%20atmosphere%2C%20vertical%20composition&width=160&height=200&seq=beauty-stream&orientation=portrait",
    hostAvatar: "https://readdy.ai/api/search-image?query=Beauty%20influencer%20woman%20portrait%2C%20flawless%20makeup%2C%20elegant%20styling%2C%20beauty%20studio%20background%2C%20warm%20smile%2C%20high%20quality%20headshot%2C%20soft%20lighting&width=32&height=32&seq=host-avatar-beauty&orientation=squarish"
  }
];

export default function LiveShoppingGrid() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-white">      
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 px-4 pb-2" style={{ width: 'max-content' }}>
          {liveStreams.map((stream) => (
            <Link key={stream.id} href={`/live/${stream.id}`}>
              <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow" style={{ width: '160px' }}>
                <div className="relative">
                  <img 
                    src={stream.thumbnail}
                    alt={stream.title}
                    className="w-full h-32 object-cover object-top"
                  />
                  
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    LIVE
                  </div>
                  
                  <div className="absolute top-2 right-2 bg-black/50 text-white px-1.5 py-0.5 rounded-full text-xs" suppressHydrationWarning={true}>
                    {mounted ? (stream.viewers > 1000 ? `${(stream.viewers / 1000).toFixed(1)}K` : stream.viewers) : '...'}
                  </div>
                </div>
                
                <div className="p-3">
                  <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">
                    {stream.title}
                  </h3>
                  
                  <div className="flex items-center gap-2">
                    <img 
                      src={stream.hostAvatar}
                      alt={stream.host}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-gray-600 text-xs truncate">
                      {stream.host}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
