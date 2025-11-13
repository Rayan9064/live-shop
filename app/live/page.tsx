
import TopNavigation from '../../components/TopNavigation';
import BottomTabBar from '../../components/BottomTabBar';
import LiveStreamCard from './LiveStreamCard';

export default function LivePage() {
  const liveStreams = [
    {
      id: '3',
      title: 'Jordan Sneaker Authentication & Reviews',
      host: 'Sneaker King',
      hostAvatar: 'https://readdy.ai/api/search-image?query=Young%20sneaker%20enthusiast%20man%20portrait%2C%20confident%20smile%2C%20urban%20style%2C%20sneaker%20collection%20background%2C%20high%20quality%20headshot%2C%20modern%20lighting&width=40&height=40&seq=host-avatar-3&orientation=squarish',
      viewers: 6234,
      followers: 92000,
      thumbnail: 'https://readdy.ai/api/search-image?query=Air%20Jordan%20sneakers%20collection%2C%20multiple%20colorways%2C%20sneaker%20boxes%2C%20authentication%20tools%2C%20urban%20streetwear%20setup%2C%20dynamic%20lighting%2C%20vertical%20composition&width=200&height=300&seq=live-stream-3&orientation=portrait',
      category: 'Sneakers',
      isLive: true
    },
    {
      id: '1',
      title: 'Rare Pokemon Cards Unboxing & Trading',
      host: 'CardMaster Jake',
      hostAvatar: 'https://readdy.ai/api/search-image?query=Young%20male%20pokemon%20card%20collector%20portrait%2C%20excited%20expression%2C%20gaming%20setup%20background%2C%20casual%20attire%2C%20high%20quality%20headshot%2C%20natural%20lighting&width=40&height=40&seq=host-avatar-1&orientation=squarish',
      viewers: 4521,
      followers: 78000,
      thumbnail: 'https://readdy.ai/api/search-image?query=Pokemon%20trading%20cards%20collection%20display%2C%20holographic%20cards%2C%20booster%20packs%2C%20card%20sleeves%2C%20gaming%20table%20setup%2C%20bright%20colorful%20lighting%2C%20collector%20atmosphere%2C%20vertical%20composition&width=200&height=300&seq=live-stream-1&orientation=portrait',
      category: 'Collectibles',
      isLive: true
    },
    {
      id: '2',
      title: 'Vintage Fashion Finds & Styling Tips',
      host: 'Vintage Vera',
      hostAvatar: 'https://readdy.ai/api/search-image?query=Stylish%20woman%20portrait%2C%20vintage%20fashion%20enthusiast%2C%20retro%20styling%2C%20warm%20smile%2C%20boutique%20background%2C%20high%20quality%20headshot%2C%20soft%20lighting&width=40&height=40&seq=host-avatar-2&orientation=squarish',
      viewers: 2847,
      followers: 45000,
      thumbnail: 'https://readdy.ai/api/search-image?query=Vintage%20clothing%20collection%2C%20retro%20dresses%2C%20classic%20accessories%2C%20antique%20wardrobe%2C%20warm%20nostalgic%20lighting%2C%20fashion%20boutique%20atmosphere%2C%20vertical%20composition&width=200&height=300&seq=live-stream-2&orientation=portrait',
      category: 'Fashion',
      isLive: true
    },
    {
      id: '4',
      title: 'Comic Book Grading & Rare Finds',
      host: 'Comic Curator',
      hostAvatar: 'https://readdy.ai/api/search-image?query=Comic%20book%20expert%20man%20portrait%2C%20glasses%2C%20friendly%20expression%2C%20comic%20store%20background%2C%20casual%20attire%2C%20high%20quality%20headshot%2C%20warm%20lighting&width=40&height=40&seq=host-avatar-4&orientation=squarish',
      viewers: 1923,
      followers: 34000,
      thumbnail: 'https://readdy.ai/api/search-image?query=Vintage%20comic%20books%20collection%2C%20superhero%20comics%2C%20grading%20supplies%2C%20comic%20book%20store%20atmosphere%2C%20colorful%20covers%2C%20organized%20display%2C%20vertical%20composition&width=200&height=300&seq=live-stream-4&orientation=portrait',
      category: 'Comics',
      isLive: true
    },
    {
      id: '5',
      title: 'Luxury Watch Collection Showcase',
      host: 'TimeKeeper Tom',
      hostAvatar: 'https://readdy.ai/api/search-image?query=Professional%20watch%20collector%20man%20portrait%2C%20sophisticated%20style%2C%20luxury%20background%2C%20confident%20expression%2C%20high%20quality%20headshot%2C%20elegant%20lighting&width=40&height=40&seq=host-avatar-5&orientation=squarish',
      viewers: 3156,
      followers: 67000,
      thumbnail: 'https://readdy.ai/api/search-image?query=Luxury%20watches%20collection%2C%20Rolex%20Omega%20timepieces%2C%20watch%20cases%2C%20elegant%20display%2C%20premium%20lighting%2C%20sophisticated%20atmosphere%2C%20vertical%20composition&width=200&height=300&seq=live-stream-5&orientation=portrait',
      category: 'Watches',
      isLive: true
    },
    {
      id: '6',
      title: 'Original Art Pieces & Artist Stories',
      host: 'Art Curator Anna',
      hostAvatar: 'https://readdy.ai/api/search-image?query=Professional%20art%20curator%20woman%20portrait%2C%20artistic%20style%2C%20gallery%20background%2C%20creative%20expression%2C%20high%20quality%20headshot%2C%20artistic%20lighting&width=40&height=40&seq=host-avatar-6&orientation=squarish',
      viewers: 1654,
      followers: 28000,
      thumbnail: 'https://readdy.ai/api/search-image?query=Original%20artwork%20collection%2C%20paintings%20sculptures%2C%20art%20gallery%20setting%2C%20creative%20studio%20atmosphere%2C%20artistic%20lighting%2C%20cultural%20display%2C%20vertical%20composition&width=200&height=300&seq=live-stream-6&orientation=portrait',
      category: 'Art',
      isLive: true
    },
    {
      id: '7',
      title: 'Tech Gadgets Flash Sale Event',
      host: 'Tech Guru Mike',
      hostAvatar: 'https://readdy.ai/api/search-image?query=Tech%20reviewer%20man%20portrait%2C%20modern%20style%2C%20technology%20background%2C%20enthusiastic%20expression%2C%20high%20quality%20headshot%2C%20bright%20lighting&width=40&height=40&seq=host-avatar-7&orientation=squarish',
      viewers: 5789,
      followers: 115000,
      thumbnail: 'https://readdy.ai/api/search-image?query=Modern%20tech%20gadgets%20display%2C%20smartphones%20tablets%20laptops%2C%20high-tech%20setup%2C%20futuristic%20lighting%2C%20technology%20showcase%2C%20vertical%20composition&width=200&height=300&seq=live-stream-7&orientation=portrait',
      category: 'Electronics',
      isLive: true
    },
    {
      id: '8',
      title: 'Beauty Products & Makeup Tutorials',
      host: 'Beauty Bella',
      hostAvatar: 'https://readdy.ai/api/search-image?query=Beauty%20influencer%20woman%20portrait%2C%20radiant%20smile%2C%20makeup%20studio%20background%2C%20glamorous%20style%2C%20high%20quality%20headshot%2C%20perfect%20lighting&width=40&height=40&seq=host-avatar-8&orientation=squarish',
      viewers: 4321,
      followers: 89000,
      thumbnail: 'https://readdy.ai/api/search-image?query=Beauty%20products%20collection%2C%20makeup%20palettes%2C%20skincare%20items%2C%20beauty%20studio%20setup%2C%20elegant%20lighting%2C%20glamorous%20atmosphere%2C%20vertical%20composition&width=200&height=300&seq=live-stream-8&orientation=portrait',
      category: 'Beauty',
      isLive: true
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <TopNavigation />
      
      <div className="pt-16 pb-20 px-3">
        <div className="grid grid-cols-2 gap-2">
          {liveStreams.map((stream) => (
            <LiveStreamCard key={stream.id} stream={stream} />
          ))}
        </div>

        {liveStreams.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <i className="ri-live-line text-gray-300 text-4xl"></i>
            </div>
            <p className="text-gray-500">No live streams found</p>
          </div>
        )}
      </div>

      <BottomTabBar />
    </div>
  );
}
