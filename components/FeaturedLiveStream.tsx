
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function FeaturedLiveStream() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link href="/live/1">
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <div className="relative">
          <img 
            src="https://readdy.ai/api/search-image?query=Professional%20female%20fashion%20influencer%20in%20modern%20studio%20setting%2C%20bright%20lighting%2C%20fashion%20products%20displayed%2C%20clean%20minimalist%20background%2C%20high-quality%20streaming%20setup%2C%20professional%20photography%20style%2C%20vibrant%20colors&width=375&height=200&seq=featured-stream&orientation=landscape"
            alt="Featured Live Stream"
            className="w-full h-48 object-cover object-top"
          />
          
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            LIVE
          </div>
          
          <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs" suppressHydrationWarning={true}>
            {mounted ? '3,247 watching' : '... watching'}
          </div>
          
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center gap-2">
              <img 
                src="https://readdy.ai/api/search-image?query=Professional%20young%20woman%20portrait%2C%20friendly%20smile%2C%20modern%20style%2C%20clean%20background%2C%20high%20quality%20headshot%2C%20natural%20lighting%2C%20business%20casual%20attire&width=40&height=40&seq=host-avatar-1&orientation=squarish"
                alt="Host"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <div>
                <p className="text-white text-sm font-medium">
                  Sarah Chen
                </p>
                <p className="text-white/80 text-xs">
                  42K followers
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2">
            Fashion Week Special: Latest Trends & Exclusive Deals
          </h3>
          <p className="text-gray-600 text-sm">
            Discover the hottest fashion trends and get exclusive discounts on premium brands
          </p>
        </div>
      </div>
    </Link>
  );
}
