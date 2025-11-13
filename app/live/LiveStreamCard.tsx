
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface LiveStreamCardProps {
  stream: {
    id: string;
    title: string;
    host: string;
    hostAvatar: string;
    viewers: number;
    followers: number;
    thumbnail: string;
    category: string;
    isLive: boolean;
  };
}

export default function LiveStreamCard({ stream }: LiveStreamCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link href={`/live/${stream.id}`}>
      <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
        <div className="relative">
          <img 
            src={stream.thumbnail}
            alt={stream.title}
            className="w-full h-64 object-cover object-top"
          />
          
          {stream.isLive && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
              LIVE
            </div>
          )}
          
          <div className="absolute top-2 right-2 bg-black/50 text-white px-1.5 py-0.5 rounded-full text-xs">
            {stream.viewers > 1000 ? `${(stream.viewers / 1000).toFixed(1)}K` : stream.viewers}
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
            <span className="text-gray-600 text-xs">
              {stream.host}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
