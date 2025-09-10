// src/components/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import categoriesService from '../api/category'; // Corrected import path, assuming 'categories.js' not 'category.js'

const ProductForm = ({ initialData = {}, onSubmit, loading, error, isEditMode = false }) => {
  // --- FIX APPLIED HERE ---
  // Use optional chaining for initialData itself
  const [formData, setFormData] = useState({
    title: initialData?.title || '', // Add ?. here
    description: initialData?.description || '', // Add ?. here
    price: initialData?.price || '', // Add ?. here
    stock: initialData?.stock || '', // Add ?. here
    category_id: initialData?.category?.id || '',
    image: null, // Add image field
  });

  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const data = await categoriesService.getAllCategories();
        setCategories(data);

        // Update form data based on initialData (for edit mode) or default category (for add mode)
        setFormData(prev => ({
          ...prev,
          // --- Also apply optional chaining here for robustness ---
          title: initialData?.title || '',
          description: initialData?.description || '',
          price: initialData?.price || '',
          stock: initialData?.stock || '',
          category_id: initialData?.category?.id || prev.category_id || (data.length > 0 ? data[0].id : ''),
        }));

      } catch (err) {
        setCategoriesError('Failed to load categories.');
        console.error('Error fetching categories:', err);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files && files.length > 0 ? files[0] : null,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = new FormData();
    dataToSubmit.append('product[title]', formData.title);
    dataToSubmit.append('product[description]', formData.description);
    dataToSubmit.append('product[price]', String(formData.price));
    dataToSubmit.append('product[stock]', String(formData.stock));
    dataToSubmit.append('product[category_id]', String(formData.category_id));
    if (formData.image) {
      dataToSubmit.append('product[image]', formData.image);
    }
    // Debug: Log all FormData entries
    for (let pair of dataToSubmit.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }
    onSubmit(dataToSubmit);
  };

  if (categoriesLoading) {
    return <div className="text-center text-gray-600">Loading categories...</div>;
  }

  if (categoriesError) {
    return <div className="text-center text-red-600">Error loading categories: {categoriesError}</div>;
  }

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Product Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          rows="3"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        ></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price ($)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0.01"
            step="0.01"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
            Stock Quantity
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            min="0"
            step="1"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category_id"
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Product Image
        </label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (isEditMode ? 'Updating...' : 'Adding...') : (isEditMode ? 'Update Product' : 'Add Product')}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;