import ProductDetailHeader from './ProductDetailHeader';
import ProductImageGallery from './ProductImageGallery';
import ProductInfo from './ProductInfo';
import ProductActions from './ProductActions';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ];
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const productData = {
    '1': {
      id: '1',
      name: 'Wireless Bluetooth Headphones Premium',
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.8,
      reviews: 234,
      description: 'Experience premium sound quality with these wireless Bluetooth headphones. Featuring advanced noise cancellation technology, 30-hour battery life, and comfortable over-ear design. Perfect for music lovers, professionals, and anyone who values high-quality audio. The headphones come with a premium carrying case and multiple ear tip sizes for the perfect fit.',
      images: [
        'https://readdy.ai/api/search-image?query=Premium%20wireless%20bluetooth%20headphones%20with%20sleek%20black%20design%2C%20professional%20product%20photography%2C%20isolated%20on%20white%20background%2C%20high%20detail%2C%20studio%20lighting%2C%20modern%20audio%20device&width=400&height=400&seq=prod1-1&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Wireless%20bluetooth%20headphones%20side%20view%2C%20premium%20black%20design%2C%20professional%20product%20photography%2C%20isolated%20on%20white%20background%2C%20high%20detail%2C%20studio%20lighting&width=400&height=400&seq=prod1-2&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Bluetooth%20headphones%20with%20carrying%20case%2C%20premium%20accessories%2C%20professional%20product%20photography%2C%20isolated%20on%20white%20background%2C%20high%20detail%2C%20studio%20lighting&width=400&height=400&seq=prod1-3&orientation=squarish'
      ],
      seller: {
        id: '2',
        name: 'Tech World Store',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20male%20tech%20seller%20avatar%2C%20modern%20appearance%2C%20confident%20smile%2C%20clean%20background%2C%20portrait%20style%2C%20high%20quality%2C%20technology%20expert&width=50&height=50&seq=seller-2&orientation=squarish',
        rating: 4.8,
        followers: '89K'
      },
      variants: {
        colors: ['Black', 'White', 'Silver'],
        sizes: ['One Size']
      },
      shipping: {
        free: true,
        days: '2-3 days'
      },
      stock: 15
    },
    '2': {
      id: '2',
      name: 'Summer Floral Dress Collection',
      price: 45.99,
      originalPrice: 79.99,
      rating: 4.6,
      reviews: 156,
      description: 'Beautiful summer floral dress perfect for any occasion. Made from high-quality breathable fabric with a comfortable fit. Features elegant floral patterns and a flattering silhouette that suits all body types. Perfect for casual outings, beach vacations, or summer parties.',
      images: [
        'https://readdy.ai/api/search-image?query=Beautiful%20summer%20floral%20dress%2C%20elegant%20fashion%20clothing%2C%20vibrant%20colors%2C%20isolated%20on%20white%20background%2C%20fashion%20photography%20style%2C%20high%20detail%2C%20professional%20lighting&width=400&height=400&seq=prod2-1&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Summer%20floral%20dress%20back%20view%2C%20elegant%20fashion%20clothing%2C%20vibrant%20patterns%2C%20isolated%20on%20white%20background%2C%20fashion%20photography%20style%2C%20high%20detail&width=400&height=400&seq=prod2-2&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Floral%20dress%20detail%20close%20up%2C%20fabric%20texture%2C%20elegant%20patterns%2C%20fashion%20photography%20style%2C%20high%20detail%2C%20professional%20lighting&width=400&height=400&seq=prod2-3&orientation=squarish'
      ],
      seller: {
        id: '1',
        name: "Emma's Boutique",
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20female%20fashion%20seller%20avatar%2C%20stylish%20appearance%2C%20friendly%20smile%2C%20clean%20background%2C%20portrait%20style%2C%20high%20quality%2C%20business%20professional&width=50&height=50&seq=seller-1&orientation=squarish',
        rating: 4.9,
        followers: '156K'
      },
      variants: {
        colors: ['Floral Blue', 'Floral Pink', 'Floral Yellow'],
        sizes: ['XS', 'S', 'M', 'L', 'XL']
      },
      shipping: {
        free: true,
        days: '3-5 days'
      },
      stock: 8
    },
    '3': {
      id: '3',
      name: 'Organic Face Serum Premium',
      price: 34.99,
      originalPrice: 49.99,
      rating: 4.9,
      reviews: 89,
      description: 'Premium organic face serum with natural ingredients for healthy, glowing skin. Contains vitamin C, hyaluronic acid, and botanical extracts. Suitable for all skin types and helps reduce signs of aging while providing deep hydration.',
      images: [
        'https://readdy.ai/api/search-image?query=Premium%20organic%20face%20serum%20bottle%2C%20luxury%20skincare%20product%2C%20elegant%20packaging%2C%20isolated%20on%20white%20background%2C%20beauty%20product%20photography%2C%20high%20detail%2C%20professional%20lighting&width=400&height=400&seq=prod3-1&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Organic%20face%20serum%20with%20dropper%2C%20luxury%20skincare%2C%20elegant%20bottle%20design%2C%20isolated%20on%20white%20background%2C%20beauty%20photography%2C%20high%20detail&width=400&height=400&seq=prod3-2&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Face%20serum%20ingredients%20display%2C%20organic%20botanicals%2C%20natural%20skincare%2C%20beauty%20product%20photography%2C%20high%20detail%2C%20professional%20lighting&width=400&height=400&seq=prod3-3&orientation=squarish'
      ],
      seller: {
        id: '3',
        name: 'Beauty Palace',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20female%20beauty%20expert%20avatar%2C%20glamorous%20appearance%2C%20warm%20smile%2C%20clean%20background%2C%20portrait%20style%2C%20high%20quality%2C%20beauty%20specialist&width=50&height=50&seq=seller-3&orientation=squarish',
        rating: 4.9,
        followers: '234K'
      },
      variants: {
        colors: ['Original'],
        sizes: ['30ml', '50ml', '100ml']
      },
      shipping: {
        free: false,
        days: '5-7 days'
      },
      stock: 12
    }
  };

  const product = productData[id as keyof typeof productData] || productData['1'];

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductDetailHeader productId={id} />
      <ProductImageGallery images={product.images} productName={product.name} />
      <ProductInfo product={product} />
      <ProductActions productId={id} price={product.price} />
    </div>
  );
}