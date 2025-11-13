
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomTabBar() {
  const pathname = usePathname();
  
  const getActiveTab = () => {
    if (pathname === '/') return 'Home';
    if (pathname.startsWith('/live')) return 'Live';
    if (pathname.startsWith('/shop')) return 'Activity';
    if (pathname.startsWith('/profile')) return 'Profile';
    return 'Home';
  };

  const activeTab = getActiveTab();
  
  const tabs = [
    { name: 'Home', icon: 'ri-home-line', activeIcon: 'ri-home-fill', href: '/' },
    { name: 'Live', icon: 'ri-live-line', activeIcon: 'ri-live-fill', href: '/live' },
    { name: 'Activity', icon: 'ri-heart-line', activeIcon: 'ri-heart-fill', href: '/shop' },
    { name: 'Profile', icon: 'ri-user-line', activeIcon: 'ri-user-fill', href: '/profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-0 py-2">
      <div className="grid grid-cols-4 gap-0">
        {tabs.map((tab) => (
          <Link key={tab.name} href={tab.href}>
            <button
              className={`flex flex-col items-center justify-center py-2 px-1 w-full ${
                activeTab === tab.name ? 'text-gray-500' : 'text-gray-500'
              }`}
              style={activeTab === tab.name ? { color: '#072415' } : {}}
            >
              <div className="w-6 h-6 flex items-center justify-center mb-1">
                <i className={`${activeTab === tab.name ? tab.activeIcon : tab.icon} text-xl`}></i>
              </div>
              <span className="text-xs font-medium">{tab.name}</span>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
