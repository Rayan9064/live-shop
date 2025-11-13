import SellerHeader from './SellerHeader';
import SellerProfile from './SellerProfile';
import SellerTabs from './SellerTabs';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
  ];
}

export default function SellerProfilePage({ params }: { params: { id: string } }) {
  const sellerData = {
    '1': {
      id: '1',
      name: "Emma's Boutique",
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20female%20fashion%20seller%20avatar%2C%20stylish%20appearance%2C%20friendly%20smile%2C%20clean%20background%2C%20portrait%20style%2C%20high%20quality%2C%20business%20professional&width=100&height=100&seq=seller-1-profile&orientation=squarish',
      coverImage: 'https://readdy.ai/api/search-image?query=Fashion%20boutique%20store%20interior%2C%20elegant%20clothing%20displays%2C%20modern%20retail%20space%2C%20professional%20photography%2C%20high%20quality%2C%20luxury%20fashion%20store&width=400&height=200&seq=seller-1-cover&orientation=landscape',
      rating: 4.9,
      followers: '156K',
      following: '2.3K',
      products: 248,
      description: 'Welcome to Emma\'s Boutique! We specialize in trendy and affordable fashion for modern women. Our carefully curated collection features the latest styles from emerging designers and established brands. We pride ourselves on exceptional customer service and fast shipping.',
      location: 'New York, USA',
      joinDate: 'Jan 2020',
      verified: true,
      responseTime: 'Within 1 hour',
      responseRate: '98%'
    },
    '2': {
      id: '2',
      name: 'Tech World Store',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20male%20tech%20seller%20avatar%2C%20modern%20appearance%2C%20confident%20smile%2C%20clean%20background%2C%20portrait%20style%2C%20high%20quality%2C%20technology%20expert&width=100&height=100&seq=seller-2-profile&orientation=squarish',
      coverImage: 'https://readdy.ai/api/search-image?query=Modern%20technology%20store%20interior%2C%20electronic%20devices%20displays%2C%20sleek%20retail%20space%2C%20professional%20photography%2C%20high%20quality%2C%20tech%20store&width=400&height=200&seq=seller-2-cover&orientation=landscape',
      rating: 4.8,
      followers: '89K',
      following: '1.8K',
      products: 156,
      description: 'Your trusted source for the latest technology and electronics. We offer premium gadgets, accessories, and smart devices at competitive prices. All products come with warranty and our expert technical support team is always ready to help.',
      location: 'San Francisco, USA',
      joinDate: 'Mar 2019',
      verified: true,
      responseTime: 'Within 2 hours',
      responseRate: '95%'
    },
    '3': {
      id: '3',
      name: 'Beauty Palace',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20female%20beauty%20expert%20avatar%2C%20glamorous%20appearance%2C%20warm%20smile%2C%20clean%20background%2C%20portrait%20style%2C%20high%20quality%2C%20beauty%20specialist&width=100&height=100&seq=seller-3-profile&orientation=squarish',
      coverImage: 'https://readdy.ai/api/search-image?query=Luxury%20beauty%20store%20interior%2C%20cosmetics%20displays%2C%20elegant%20retail%20space%2C%20professional%20photography%2C%20high%20quality%2C%20beauty%20salon&width=400&height=200&seq=seller-3-cover&orientation=landscape',
      rating: 4.9,
      followers: '234K',
      following: '3.1K',
      products: 892,
      description: 'Discover the world of beauty with our premium cosmetics and skincare products. We feature top brands and exclusive collections to help you look and feel your best. Our beauty experts are here to provide personalized recommendations.',
      location: 'Los Angeles, USA',
      joinDate: 'Aug 2018',
      verified: true,
      responseTime: 'Within 30 minutes',
      responseRate: '99%'
    },
    '4': {
      id: '4',
      name: 'Home Style Hub',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20interior%20design%20expert%20avatar%2C%20sophisticated%20appearance%2C%20friendly%20smile%2C%20clean%20background%2C%20portrait%20style%2C%20high%20quality%2C%20home%20decorator&width=100&height=100&seq=seller-4-profile&orientation=squarish',
      coverImage: 'https://readdy.ai/api/search-image?query=Modern%20home%20decor%20store%20interior%2C%20furniture%20displays%2C%20stylish%20retail%20space%2C%20professional%20photography%2C%20high%20quality%2C%20home%20goods%20store&width=400&height=200&seq=seller-4-cover&orientation=landscape',
      rating: 4.7,
      followers: '67K',
      following: '1.2K',
      products: 324,
      description: 'Transform your living space with our curated collection of home decor and furniture. From modern minimalist to classic traditional styles, we have everything you need to create your dream home. Quality craftsmanship guaranteed.',
      location: 'Chicago, USA',
      joinDate: 'Nov 2020',
      verified: true,
      responseTime: 'Within 3 hours',
      responseRate: '92%'
    }
  };

  const seller = sellerData[params.id as keyof typeof sellerData] || sellerData['1'];

  return (
    <div className="min-h-screen bg-gray-50">
      <SellerHeader sellerId={params.id} />
      <SellerProfile seller={seller} />
      <SellerTabs sellerId={params.id} />
    </div>
  );
}