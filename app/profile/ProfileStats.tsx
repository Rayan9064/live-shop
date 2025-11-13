
'use client';

export default function ProfileStats() {
  const stats = [
    { label: 'Orders', value: '47', icon: 'ri-shopping-bag-line' },
    { label: 'Wishlist', value: '23', icon: 'ri-heart-line' },
    { label: 'Reviews', value: '127', icon: 'ri-star-line' },
    { label: 'Points', value: '2,450', icon: 'ri-coin-line' }
  ];

  return (
    <div className="px-4 mt-6">
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-50 rounded-2xl p-4 text-center">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
              <i className={`${stat.icon} text-[#072415] text-lg`}></i>
            </div>
            <p className="text-lg font-bold text-gray-900" suppressHydrationWarning={true}>
              {stat.value}
            </p>
            <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
