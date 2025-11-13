
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PhotoUploadForm() {
  const router = useRouter();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const filters = [
    { name: 'Original', filter: 'none' },
    { name: 'Vintage', filter: 'sepia(0.8) contrast(1.2)' },
    { name: 'Cool', filter: 'hue-rotate(180deg) saturate(1.2)' },
    { name: 'Warm', filter: 'hue-rotate(30deg) saturate(1.3)' },
    { name: 'B&W', filter: 'grayscale(1) contrast(1.1)' },
    { name: 'Bright', filter: 'brightness(1.3) contrast(1.1)' }
  ];

  const [selectedFilter, setSelectedFilter] = useState(filters[0]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setSelectedImages(files);
      const urls = files.map(file => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim()) && tags.length < 10) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleShare = async () => {
    if (selectedImages.length === 0) {
      alert('Please select at least one photo');
      return;
    }

    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      router.push('/profile');
    }, 3000);
  };

  return (
    <div className="pt-4 pb-20">
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <Link href="/shop">
          <button className="w-8 h-8 flex items-center justify-center">
            <i className="ri-arrow-left-line text-xl"></i>
          </button>
        </Link>
        <h1 className="text-lg font-bold">Share Photo</h1>
        <button
          onClick={handleShare}
          disabled={isUploading || selectedImages.length === 0}
          className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg disabled:bg-gray-300"
        >
          {isUploading ? 'Sharing...' : 'Share'}
        </button>
      </div>

      <div className="space-y-6">
        {/* Photo Selection */}
        {selectedImages.length === 0 ? (
          <div className="p-4">
            <label className="block">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 transition-colors">
                <i className="ri-camera-line text-4xl text-gray-400 mb-4"></i>
                <div className="text-lg font-medium text-gray-700 mb-2">Select Photos</div>
                <div className="text-sm text-gray-500">Choose up to 10 photos to share</div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </div>
            </label>
          </div>
        ) : (
          <>
            {/* Photo Preview */}
            <div className="p-4">
              <div className="relative">
                <img
                  src={previewUrls[0]}
                  alt="Selected photo"
                  className="w-full aspect-square object-cover rounded-xl"
                  style={{ filter: selectedFilter.filter }}
                />
                {selectedImages.length > 1 && (
                  <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                    1/{selectedImages.length}
                  </div>
                )}
              </div>
              
              {/* Change Photo Button */}
              <label className="block mt-3">
                <button className="w-full py-2 border border-gray-300 rounded-lg text-sm font-medium">
                  Change Photos
                </button>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </label>
            </div>

            {/* Filters */}
            <div className="px-4">
              <h3 className="font-medium mb-3">Filters</h3>
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {filters.map((filter) => (
                  <button
                    key={filter.name}
                    onClick={() => setSelectedFilter(filter)}
                    className={`flex-shrink-0 text-center ${
                      selectedFilter.name === filter.name ? 'text-blue-600' : 'text-gray-600'
                    }`}
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden mb-1 border-2 border-transparent">
                      <img
                        src={previewUrls[0]}
                        alt={filter.name}
                        className="w-full h-full object-cover"
                        style={{ filter: filter.filter }}
                      />
                    </div>
                    <div className="text-xs font-medium">{filter.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Caption */}
            <div className="px-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write a caption..."
                rows={3}
                maxLength={2200}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <div className="text-xs text-gray-500 mt-1">{caption.length}/2200</div>
            </div>

            {/* Tags */}
            <div className="px-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    #{tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-2 w-4 h-4 flex items-center justify-center"
                    >
                      <i className="ri-close-line text-xs"></i>
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  placeholder="Add tag..."
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={addTag}
                  disabled={!currentTag.trim() || tags.length >= 10}
                  className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg disabled:bg-gray-300"
                >
                  Add
                </button>
              </div>
              <div className="text-xs text-gray-500 mt-1">{tags.length}/10 tags</div>
            </div>

            {/* Privacy Settings */}
            <div className="px-4">
              <h3 className="font-medium mb-3">Privacy</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="radio" name="privacy" value="public" defaultChecked className="mr-3" />
                  <div>
                    <div className="font-medium text-sm">Public</div>
                    <div className="text-xs text-gray-500">Anyone can see this post</div>
                  </div>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="privacy" value="followers" className="mr-3" />
                  <div>
                    <div className="font-medium text-sm">Followers Only</div>
                    <div className="text-xs text-gray-500">Only your followers can see this</div>
                  </div>
                </label>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
