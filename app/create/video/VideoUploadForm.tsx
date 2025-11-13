
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function VideoUploadForm() {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Entertainment',
    tags: [] as string[],
    isPrivate: false,
    allowComments: true,
    allowDownload: false
  });
  const [currentTag, setCurrentTag] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const categories = [
    'Entertainment', 'Education', 'Music', 'Gaming', 'Sports', 'Technology',
    'Fashion', 'Food', 'Travel', 'Lifestyle', 'Business', 'Art'
  ];

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedVideo(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      const url = URL.createObjectURL(file);
      setThumbnailUrl(url);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim()) && formData.tags.length < 10) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleUpload = async () => {
    if (!selectedVideo || !formData.title.trim()) {
      alert('Please select a video and enter a title');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            router.push('/profile');
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  return (
    <div className="pt-4 pb-20">
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <Link href="/shop">
          <button className="w-8 h-8 flex items-center justify-center">
            <i className="ri-arrow-left-line text-xl"></i>
          </button>
        </Link>
        <h1 className="text-lg font-bold">Upload Video</h1>
        <button
          onClick={handleUpload}
          disabled={isUploading || !selectedVideo || !formData.title.trim()}
          className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg disabled:bg-gray-300"
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      <div className="space-y-6">
        {/* Video Selection */}
        {!selectedVideo ? (
          <div className="p-4">
            <label className="block">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 transition-colors">
                <i className="ri-video-add-line text-4xl text-gray-400 mb-4"></i>
                <div className="text-lg font-medium text-gray-700 mb-2">Select Video</div>
                <div className="text-sm text-gray-500 mb-4">Choose a video file to upload</div>
                <div className="text-xs text-gray-400">Supported formats: MP4, MOV, AVI (Max 100MB)</div>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoSelect}
                  className="hidden"
                />
              </div>
            </label>
          </div>
        ) : (
          <>
            {/* Video Preview */}
            <div className="p-4">
              <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
                <video
                  src={previewUrl}
                  controls
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                <span>Size: {(selectedVideo.size / (1024 * 1024)).toFixed(1)} MB</span>
                <label className="text-blue-600 cursor-pointer">
                  Change Video
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoSelect}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <div className="px-4">
                <div className="bg-white rounded-lg p-4 border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Uploading...</span>
                    <span className="text-sm text-gray-600">{Math.round(uploadProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* Custom Thumbnail */}
            <div className="px-4">
              <h3 className="font-medium mb-3">Custom Thumbnail (Optional)</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                {thumbnailUrl ? (
                  <div className="relative">
                    <img src={thumbnailUrl} alt="Thumbnail" className="w-full h-32 object-cover rounded-lg" />
                    <button
                      onClick={() => {
                        setThumbnailUrl('');
                        setThumbnail(null);
                      }}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                    >
                      <i className="ri-close-line text-white text-sm"></i>
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer block text-center">
                    <i className="ri-image-add-line text-2xl text-gray-400 mb-2"></i>
                    <div className="text-sm text-gray-600">Upload custom thumbnail</div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailSelect}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Video Details */}
            <div className="px-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter video title..."
                  maxLength={100}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="text-xs text-gray-500 mt-1">{formData.title.length}/100</div>
              </div>

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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your video..."
                  rows={4}
                  maxLength={5000}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <div className="text-xs text-gray-500 mt-1">{formData.description.length}/5000</div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.tags.map((tag) => (
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
                    disabled={!currentTag.trim() || formData.tags.length >= 10}
                    className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg disabled:bg-gray-300"
                  >
                    Add
                  </button>
                </div>
                <div className="text-xs text-gray-500 mt-1">{formData.tags.length}/10 tags</div>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="px-4">
              <h3 className="font-medium mb-3">Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Private Video</div>
                    <div className="text-xs text-gray-500">Only you can see this video</div>
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
                    <div className="text-xs text-gray-500">Viewers can comment on your video</div>
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
                    <div className="font-medium text-sm">Allow Download</div>
                    <div className="text-xs text-gray-500">Let viewers download your video</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="allowDownload"
                      checked={formData.allowDownload}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
