// src/pages/Admin/CategoryManagement.jsx
import React, { useState, useEffect, useCallback } from 'react';
import categoriesApi from '../../api/category';
import CategoryForm from '../../components/CategoryForm';
import Modal from '../../components/Modal'; // Your Modal component

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null); // Null for add, object for edit
  const [formError, setFormError] = useState(null); // Error for form submissions
  const [isSubmitting, setIsSubmitting] = useState(false); // For form submission loading

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await categoriesApi.getAllCategories();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleAddCategoryClick = () => {
    setEditingCategory(null); // Clear for new category
    setFormError(null);
    setShowModal(true);
  };

  const handleEditCategoryClick = (category) => {
    setEditingCategory(category); // Set category data for editing
    setFormError(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null); // Clear editing category when modal closes
    setFormError(null);
  };

  const handleSubmitCategory = async (formData) => {
    setIsSubmitting(true);
    setFormError(null);
    try {
      if (editingCategory) {
        // Update existing category
        await categoriesApi.updateCategory(editingCategory.id, formData);
        // Optimistically update UI or re-fetch
        setCategories(categories.map(cat =>
          cat.id === editingCategory.id ? { ...cat, ...formData } : cat
        ));
        alert('Category updated successfully!');
      } else {
        // Create new category
        const newCategory = await categoriesApi.createCategory(formData);
        // Add new category to the list
        setCategories([...categories, newCategory]);
        alert('Category added successfully!');
      }
      handleCloseModal();
    } catch (err) {
      console.error("Error submitting category:", err.response ? err.response.data : err);
      const errorMessage = err.response?.data?.errors?.join(', ') || err.message || "An unexpected error occurred.";
      setFormError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category? This cannot be undone.")) {
      setIsLoading(true); // Show loading for main list during delete
      setError(null);
      try {
        await categoriesApi.deleteCategory(id);
        setCategories(categories.filter(cat => cat.id !== id));
        alert('Category deleted successfully!');
      } catch (err) {
        console.error("Error deleting category:", err.response ? err.response.data : err);
        const errorMessage = err.response?.data?.errors?.join(', ') || err.message || "Failed to delete category.";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading categories...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>{error}</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', border: '1px solid #eee', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Manage Categories</h2>

      <button
        onClick={handleAddCategoryClick}
        style={{ padding: '10px 20px', borderRadius: '4px', border: 'none', background: '#28a745', color: 'white', cursor: 'pointer', marginBottom: '20px' }}
      >
        Add New Category
      </button>

      {categories.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#555' }}>No categories found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr style={{ background: '#f8f8f8' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>ID</th>
              <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{category.id}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{category.name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                  <button
                    onClick={() => handleEditCategoryClick(category)}
                    style={{ padding: '5px 10px', borderRadius: '4px', border: '1px solid #007bff', background: 'transparent', color: '#007bff', cursor: 'pointer', marginRight: '5px' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    style={{ padding: '5px 10px', borderRadius: '4px', border: '1px solid #dc3545', background: 'transparent', color: '#dc3545', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal
        show={showModal}
        onClose={handleCloseModal}
        title={editingCategory ? 'Edit Category' : 'Add New Category'}
      >
        <CategoryForm
          initialData={editingCategory}
          onSubmit={handleSubmitCategory}
          onClose={handleCloseModal}
          isLoading={isSubmitting}
          error={formError}
        />
      </Modal>
    </div>
  );
};

export default CategoryManagement;