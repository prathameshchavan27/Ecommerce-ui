// src/pages/SellerDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import productsService from '../api/product'; // Your products API service
import ProductForm from '../components/ProductForm'; // Import the reusable form
import Modal from '../components/Modal'; // We'll create a simple Modal component next


const SellerDashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formLoading, setFormLoading] = useState(false); // For form submission loading
  const [formError, setFormError] = useState(null);     // For form submission errors

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); // Product being edited

  useEffect(() => {
    fetchSellerProducts();
  }, []);

  const fetchSellerProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productsService.getSellerProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to load your products.');
      console.error('Error fetching seller products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProductClick = () => {
    setIsEditMode(false);
    setCurrentProduct(null); // Clear any previous product data
    setShowModal(true);
  };

  const handleEditProductClick = async (productId) => {
    try {
      setLoading(true); // Show loading while fetching product for edit
      const productToEdit = await productsService.getSellerProductById(productId);
      setCurrentProduct(productToEdit);
      setIsEditMode(true);
      setShowModal(true);
    } catch (err) {
      setError('Failed to load product for editing.');
      console.error('Error fetching product for edit:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        setLoading(true);
        await productsService.deleteProduct(productId);
        alert('Product deleted successfully!');
        fetchSellerProducts(); // Re-fetch products to update the list
      } catch (err) {
        setError('Failed to delete product.');
        console.error('Error deleting product:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmitProduct = async (formData) => {
    setFormLoading(true);
    setFormError(null);
    try {
      let response;
      if (isEditMode && currentProduct) {
        response = await productsService.updateProduct(currentProduct.id, formData);
        alert('Product updated successfully!');
      } else {
        response = await productsService.createProduct(formData);
        alert('Product added successfully!');
      }
      console.log('Product operation successful:', response);
      setShowModal(false); // Close modal on success
      fetchSellerProducts(); // Refresh the product list
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred.';
      setFormError(errorMessage);
      console.error('Product operation failed:', err.response?.data || err.message);
    } finally {
      setFormLoading(false);
    }
  };

  // --- Render Logic ---
  if (loading) {
    return (
      <div className="container mx-auto p-6 text-center mt-10">
        <h2 className="text-2xl text-gray-700">Loading your products...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 text-center mt-10">
        <h2 className="text-2xl text-red-600">Error: {error}</h2>
        <p className="text-gray-600 mt-2">Please try again or contact support.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Seller Dashboard</h1>
        <button
          onClick={handleAddProductClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200"
        >
          Add New Product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="text-center text-gray-600 text-lg mt-8 p-6 bg-white rounded-lg shadow-md">
          <p className="mb-4">You don't have any products listed yet.</p>
          <button
            onClick={handleAddProductClick}
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Add Your First Product
          </button>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${parseFloat(product.price).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category ? product.category.name : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditProductClick(product.id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Product Add/Edit Modal */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={isEditMode ? 'Edit Product' : 'Add New Product'}
      >
        <ProductForm
          initialData={currentProduct}
          onSubmit={handleSubmitProduct}
          loading={formLoading}
          error={formError}
          isEditMode={isEditMode}
        />
      </Modal>
    </div>
  );
};

export default SellerDashboardPage;