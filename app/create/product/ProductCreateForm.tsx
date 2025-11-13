
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProductCreateForm() {
  const router = useRouter();
  const [productImages, setProductImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Fashion',
    price: '',
    comparePrice: '',
    sku: '',
    inventory: '',
    weight: '',
    dimensions: { length: '', width: '', height: '' },
    tags: [] as string[],
    isDigital: false,
    requiresShipping: true,
    trackInventory: true
  });
  const [variants, setVariants] = useState([
    { name: 'Size', options: ['S', 'M', 'L', 'XL'] },
    { name: 'Color', options: ['Black', 'White', 'Blue'] }
  ]);
  const [currentTag, setCurrentTag] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const categories = [
    'Fashion', 'Electronics', 'Home & Garden', 'Beauty', 'Sports', 'Books',
    'Toys', 'Automotive', 'Health', 'Food', 'Art', 'Jewelry'
  ];

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setProductImages([...productImages, ...files].slice(0, 10));
      const newUrls = files.map(file => URL.createObjectURL(file));
      setImageUrls([...imageUrls, ...newUrls].slice(0, 10));
    }
  };

  const removeImage = (index: number) => {
    setProductImages(productImages.filter((_, i) => i !== index));
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent as keyof typeof prev] as any, [child]: value }
      }));
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

  const addVariantOption = (variantIndex: number) => {
    const newOption = prompt('Enter new option:');
    if (newOption) {
      setVariants(prev => prev.map((variant, index) => 
        index === variantIndex 
          ? { ...variant, options: [...variant.options, newOption] }
          : variant
      ));
    }
  };

  const removeVariantOption = (variantIndex: number, optionIndex: number) => {
    setVariants(prev => prev.map((variant, index) => 
      index === variantIndex 
        ? { ...variant, options: variant.options.filter((_, i) => i !== optionIndex) }
        : variant
    ));
  };

  const handleCreateProduct = async () => {
    if (!formData.name.trim() || !formData.price || productImages.length === 0) {
      alert('Please fill in required fields and add at least one image');
      return;
    }

    setIsCreating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsCreating(false);
      router.push('/shop');
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
        <h1 className="text-lg font-bold">Add Product</h1>
        <button
          onClick={handleCreateProduct}
          disabled={isCreating || !formData.name.trim() || !formData.price || productImages.length === 0}
          className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg disabled:bg-gray-300"
        >
          {isCreating ? 'Creating...' : 'Create'}
        </button>
      </div>

      <div className="space-y-6">
        {/* Product Images */}
        <div className="p-4">
          <h3 className="font-medium mb-3">Product Images</h3>
          <div className="grid grid-cols-3 gap-3 mb-3">
            {imageUrls.map((url, index) => (
              <div key={index} className="relative aspect-square">
                <img src={url} alt={`Product ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                >
                  <i className="ri-close-line text-white text-sm"></i>
                </button>
                {index === 0 && (
                  <div className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    Main
                  </div>
                )}
              </div>
            ))}
            {imageUrls.length < 10 && (
              <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400">
                <i className="ri-camera-line text-2xl text-gray-400 mb-1"></i>
                <span className="text-xs text-gray-500">Add Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <div className="text-xs text-gray-500">{imageUrls.length}/10 images</div>
        </div>

        {/* Basic Information */}
        <div className="px-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter product name..."
              maxLength={100}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
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
              placeholder="Describe your product..."
              rows={4}
              maxLength={2000}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <div className="text-xs text-gray-500 mt-1">{formData.description.length}/2000</div>
          </div>
        </div>

        {/* Pricing */}
        <div className="px-4">
          <h3 className="font-medium mb-3">Pricing</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Compare Price</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  name="comparePrice"
                  value={formData.comparePrice}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Inventory */}
        <div className="px-4">
          <h3 className="font-medium mb-3">Inventory</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  placeholder="Product SKU"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <input
                  type="number"
                  name="inventory"
                  value={formData.inventory}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">Track Inventory</div>
                <div className="text-xs text-gray-500">Monitor stock levels</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="trackInventory"
                  checked={formData.trackInventory}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Variants */}
        <div className="px-4">
          <h3 className="font-medium mb-3">Product Variants</h3>
          {variants.map((variant, variantIndex) => (
            <div key={variantIndex} className="mb-4 p-4 border border-gray-200 rounded-lg">
              <div className="font-medium text-sm mb-2">{variant.name}</div>
              <div className="flex flex-wrap gap-2 mb-2">
                {variant.options.map((option, optionIndex) => (
                  <span
                    key={optionIndex}
                    className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
                  >
                    {option}
                    <button
                      onClick={() => removeVariantOption(variantIndex, optionIndex)}
                      className="ml-2 w-4 h-4 flex items-center justify-center"
                    >
                      <i className="ri-close-line text-xs"></i>
                    </button>
                  </span>
                ))}
                <button
                  onClick={() => addVariantOption(variantIndex)}
                  className="px-3 py-1 border border-gray-300 text-gray-600 text-sm rounded-full hover:bg-gray-50"
                >
                  + Add Option
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Shipping */}
        <div className="px-4">
          <h3 className="font-medium mb-3">Shipping</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">Physical Product</div>
                <div className="text-xs text-gray-500">Requires shipping</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="requiresShipping"
                  checked={formData.requiresShipping}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {formData.requiresShipping && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weight (lbs)</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="0.0"
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Length (in)</label>
                  <input
                    type="number"
                    name="dimensions.length"
                    value={formData.dimensions.length}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="px-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {tag}
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
        </div>
      </div>
    </div>
  );
}
