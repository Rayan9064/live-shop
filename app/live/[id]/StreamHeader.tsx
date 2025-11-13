
'use client';

interface StreamHeaderProps {
  streamer: string;
  username: string;
  rating: number;
  avatar: string;
  viewers: number;
  isFollowing: boolean;
  setIsFollowing: (following: boolean) => void;
  onExit: () => void;
}

export default function StreamHeader({
  streamer,
  username,
  rating,
  avatar,
  viewers,
  isFollowing,
  setIsFollowing,
  onExit
}: StreamHeaderProps) {
  const formatViewers = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="absolute top-0 left-0 right-0 z-10">
      <div className="px-4 pt-12 pb-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={avatar}
              alt={streamer}
              className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <i className="ri-check-line text-white text-xs"></i>
            </div>
          </div>
          
          <div className="bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2">
            <div className="flex items-center space-x-2">
              <span className="text-white font-semibold text-sm">{username}</span>
              <div className="flex items-center space-x-1">
                <i className="ri-star-fill text-yellow-400 text-xs"></i>
                <span className="text-white/90 text-xs">{rating}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsFollowing(!isFollowing)}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            isFollowing 
              ? 'bg-white/20 text-white border border-white/30' 
              : 'bg-yellow-500 text-black hover:bg-yellow-400'
          }`}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </button>

        <div className="flex items-center space-x-3">
          <div className="bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center space-x-2">
            <i className="ri-user-line text-white text-sm"></i>
            <span className="text-white text-sm font-medium">{formatViewers(viewers)}</span>
          </div>
          
          <button className="w-10 h-10 bg-black/40 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <i className="ri-notification-line text-white text-lg"></i>
          </button>
          
          <button 
            onClick={onExit}
            className="w-10 h-10 bg-black/40 backdrop-blur-sm rounded-lg flex items-center justify-center"
          >
            <i className="ri-close-line text-white text-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
