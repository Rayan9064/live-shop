
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LiveSetupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    category: 'Fashion',
    description: '',
    thumbnail: null as File | null,
    isPrivate: false,
    allowComments: true,
    enableShopping: false
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    'Fashion', 'Electronics', 'Beauty', 'Home', 'Sports', 'Gaming', 
    'Food', 'Travel', 'Education', 'Entertainment'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, thumbnail: file }));
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleGoLive = async () => {
    if (!formData.title.trim()) {
      alert('Please enter a stream title');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push('/live/1');
    }, 2000);
  };

  return (
    <div className="pt-4 pb-20">
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <Link href="/shop">
          <button className="w-8 h-8 flex items-center justify-center">
            <i className="ri-arrow-left-line text-xl"></i>
          </button>
        </Link>
        <h1 className="text-lg font-bold">Go Live</h1>
        <div className="w-8"></div>
      </div>

      <div className="p-4 space-y-6">
        {/* Camera Preview */}
        <div className="relative bg-black rounded-xl overflow-hidden aspect-[9/16] max-h-80">
          <img
            src="https://readdy.ai/api/search-image?query=Live%20streaming%20camera%20preview%20interface%2C%20modern%20mobile%20app%20design%2C%20dark%20background%20with%20camera%20controls%2C%20professional%20streaming%20setup%2C%20clean%20UI%20elements&width=343&height=610&seq=camera-preview&orientation=portrait"
            alt="Camera Preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <button className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center">
              <i className="ri-camera-switch-line text-white text-lg"></i>
            </button>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-4">
            <button className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
              <i className="ri-flashlight-line text-white text-lg"></i>
            </button>
            <button className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
              <i className="ri-settings-3-line text-white text-lg"></i>
            </button>
          </div>
        </div>

        {/* Stream Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Stream Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="What's your stream about?"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength={100}
          />
          <div className="text-xs text-gray-500 mt-1">{formData.title.length}/100</div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Tell viewers what to expect..."
            rows={3}
            maxLength={500}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <div className="text-xs text-gray-500 mt-1">{formData.description.length}/500</div>
        </div>

        {/* Thumbnail Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Custom Thumbnail (Optional)</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            {previewUrl ? (
              <div className="relative">
                <img src={previewUrl} alt="Thumbnail preview" className="w-full h-32 object-cover rounded-lg" />
                <button
                  onClick={() => {
                    setPreviewUrl('');
                    setFormData(prev => ({ ...prev, thumbnail: null }));
                  }}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                >
                  <i className="ri-close-line text-white text-sm"></i>
                </button>
              </div>
            ) : (
              <label className="cursor-pointer block text-center">
                <i className="ri-image-add-line text-3xl text-gray-400 mb-2"></i>
                <div className="text-sm text-gray-600">Tap to upload thumbnail</div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Stream Settings</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm">Private Stream</div>
              <div className="text-xs text-gray-500">Only followers can join</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="isPrivate"
                checked={formData.isPrivate}
                onChange={handleInputChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm">Allow Comments</div>
              <div className="text-xs text-gray-500">Viewers can chat during stream</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="allowComments"
                checked={formData.allowComments}
                onChange={handleInputChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm">Enable Shopping</div>
              <div className="text-xs text-gray-500">Showcase products during stream</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="enableShopping"
                checked={formData.enableShopping}
                onChange={handleInputChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* Go Live Button */}
        <button
          onClick={handleGoLive}
          disabled={isLoading || !formData.title.trim()}
          className="w-full py-4 bg-red-500 text-white font-bold rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Starting Stream...</span>
            </>
          ) : (
            <>
              <i className="ri-live-line text-xl"></i>
              <span>Go Live</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
