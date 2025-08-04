// src/components/forms/CategoryForm.jsx
import React, { useState, useEffect } from 'react';

const CategoryForm = ({ initialData, onSubmit, onClose, isLoading, error }) => {
  // Initialize formData based on initialData or empty strings for new categories
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    // Add other category fields if you have them, e.g.,
    description: initialData?.description || '',
  });

  // Update form data if initialData changes (for edit mode)
  useEffect(() => {
    setFormData({
      name: initialData?.name || '',
      description: initialData?.description || '',
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass data up to parent component
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Category Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Category Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      {error && <p style={{ color: 'red', marginBottom: '10px' }}>Error: {error}</p>}

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <button
          type="button"
          onClick={onClose}
          style={{ padding: '8px 15px', borderRadius: '4px', border: '1px solid #ccc', background: 'transparent', cursor: 'pointer' }}
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          style={{ padding: '8px 15px', borderRadius: '4px', border: 'none', background: '#007bff', color: 'white', cursor: 'pointer' }}
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : (initialData ? 'Update Category' : 'Add Category')}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;