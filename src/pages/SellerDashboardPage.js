// // src/pages/SellerDashboardPage.jsx
// import React, { useState, useEffect } from 'react';
// import productsService from '../api/product'; // Your products API service
// import ProductForm from '../components/ProductForm'; // Import the reusable form
// import Modal from '../components/Modal'; // We'll create a simple Modal component next


// const SellerDashboardPage = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [formLoading, setFormLoading] = useState(false); // For form submission loading
//   const [formError, setFormError] = useState(null);     // For form submission errors

//   const [showModal, setShowModal] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [currentProduct, setCurrentProduct] = useState(null); // Product being edited

//   useEffect(() => {
//     fetchSellerProducts();
//   }, []);

//   const fetchSellerProducts = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await productsService.getSellerProducts();
//       setProducts(data);
//     } catch (err) {
//       setError('Failed to load your products.');
//       console.error('Error fetching seller products:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddProductClick = () => {
//     setIsEditMode(false);
//     setCurrentProduct(null); // Clear any previous product data
//     setShowModal(true);
//   };

//   const handleEditProductClick = async (productId) => {
//     try {
//       setLoading(true); // Show loading while fetching product for edit
//       const productToEdit = await productsService.getSellerProductById(productId);
//       setCurrentProduct(productToEdit);
//       setIsEditMode(true);
//       setShowModal(true);
//     } catch (err) {
//       setError('Failed to load product for editing.');
//       console.error('Error fetching product for edit:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteProduct = async (productId) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         setLoading(true);
//         await productsService.deleteProduct(productId);
//         alert('Product deleted successfully!');
//         fetchSellerProducts(); // Re-fetch products to update the list
//       } catch (err) {
//         setError('Failed to delete product.');
//         console.error('Error deleting product:', err);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleSubmitProduct = async (formData) => {
//     setFormLoading(true);
//     setFormError(null);
//     try {
//       let response;
//       if (isEditMode && currentProduct) {
//         response = await productsService.updateProduct(currentProduct.id, formData);
//         alert('Product updated successfully!');
//       } else {
//         response = await productsService.createProduct(formData);
//         alert('Product added successfully!');
//       }
//       console.log('Product operation successful:', response);
//       setShowModal(false); // Close modal on success
//       fetchSellerProducts(); // Refresh the product list
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred.';
//       setFormError(errorMessage);
//       console.error('Product operation failed:', err.response?.data || err.message);
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   // --- Render Logic ---
//   if (loading) {
//     return (
//       <div className="container mx-auto p-6 text-center mt-10">
//         <h2 className="text-2xl text-gray-700">Loading your products...</h2>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto p-6 text-center mt-10">
//         <h2 className="text-2xl text-red-600">Error: {error}</h2>
//         <p className="text-gray-600 mt-2">Please try again or contact support.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-6 py-10">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-4xl font-bold text-gray-800">Seller Dashboard</h1>
//         <button
//           onClick={handleAddProductClick}
//           className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200"
//         >
//           Add New Product
//         </button>
//       </div>

//       {products.length === 0 ? (
//         <div className="text-center text-gray-600 text-lg mt-8 p-6 bg-white rounded-lg shadow-md">
//           <p className="mb-4">You don't have any products listed yet.</p>
//           <button
//             onClick={handleAddProductClick}
//             className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
//           >
//             Add Your First Product
//           </button>
//         </div>
//       ) : (
//         <div className="bg-white shadow-md rounded-lg overflow-hidden">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Title
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Price
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Stock
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Category
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {products.map((product) => (
//                 <tr key={product.id}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {product.title}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     ${parseFloat(product.price).toFixed(2)}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {product.stock}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {product.category ? product.category.name : 'N/A'}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <button
//                       onClick={() => handleEditProductClick(product.id)}
//                       className="text-indigo-600 hover:text-indigo-900 mr-4"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDeleteProduct(product.id)}
//                       className="text-red-600 hover:text-red-900"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Product Add/Edit Modal */}
//       <Modal
//         show={showModal}
//         onClose={() => setShowModal(false)}
//         title={isEditMode ? 'Edit Product' : 'Add New Product'}
//       >
//         <ProductForm
//           initialData={currentProduct}
//           onSubmit={handleSubmitProduct}
//           loading={formLoading}
//           error={formError}
//           isEditMode={isEditMode}
//         />
//       </Modal>
//     </div>
//   );
// };

// export default SellerDashboardPage;

import React, { useState, useEffect, useCallback } from 'react';
// import { useAuth } from '../../context/AuthContext'; // Removed: No AuthContext here
import productsService from '../api/product'; // Your products API service
import ProductForm from '../components/ProductForm'; // Your reusable ProductForm
import Modal from '../components/Modal'; // Your Modal component

const SellerDashboardPage = () => {
  // const { currentUser } = useAuth(); // Removed: No AuthContext here
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // For main page loading
  const [error, setError] = useState(null); // For main page errors

  // States for Product Add/Edit Modal
  const [showProductModal, setShowProductModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); // Product being edited
  const [productFormLoading, setProductFormLoading] = useState(false); // For product form submission loading
  const [productFormError, setProductFormError] = useState(null);     // For product form submission errors

  // States for Individual Stock Adjustment Modal
  const [showAdjustStockModal, setShowAdjustStockModal] = useState(false);
  const [adjustingProduct, setAdjustingProduct] = useState(null); // Product whose stock is being adjusted
  const [stockChangeQuantity, setStockChangeQuantity] = useState(0); // Value from the stock adjustment input
  const [stockAdjustError, setStockAdjustError] = useState(null);
  const [isAdjustingStock, setIsAdjustingStock] = useState(false); // For stock adjustment submission loading

  // States for Bulk Stock Upload Modal
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isBulkUploading, setIsBulkUploading] = useState(false);
  const [bulkUploadError, setBulkUploadError] = useState(null);
  const [bulkUploadResult, setBulkUploadResult] = useState(null); // To display summary


  // --- Fetch Products ---
  const fetchSellerProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productsService.getSellerProducts();
      setProducts(data);
    } catch (err) {
      // setError('Failed to load your products.');
      console.error('Error fetching seller products:', err);
      // If the error is due to unauthorized access (e.g., 401),
      // your global API interceptor or parent routing should redirect to login.
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Call fetchSellerProducts directly. Rely on backend authentication
    // to protect this endpoint and redirect if unauthorized.
    fetchSellerProducts();
  }, [fetchSellerProducts]);


  // --- Product Add/Edit Handlers ---
  const handleAddProductClick = () => {
    setIsEditMode(false);
    setCurrentProduct(null); // Clear any previous product data
    setProductFormError(null); // Clear previous form errors
    setShowProductModal(true);
  };

  const handleEditProductClick = async (productId) => {
    try {
      setLoading(true); // Show main loading while fetching product for edit
      const productToEdit = await productsService.getSellerProductById(productId); // Ensure this API call exists
      setCurrentProduct(productToEdit);
      setIsEditMode(true);
      setProductFormError(null); // Clear previous form errors
      setShowProductModal(true);
    } catch (err) {
      setError('Failed to load product for editing.');
      console.error('Error fetching product for edit:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseProductModal = () => {
    setShowProductModal(false);
    setCurrentProduct(null);
    setIsEditMode(false);
    setProductFormError(null);
    setProductFormLoading(false);
  };

  const handleSubmitProduct = async (formData) => {
    setProductFormLoading(true);
    setProductFormError(null);
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
      setShowProductModal(false); // Close modal on success
      fetchSellerProducts(); // Refresh the product list
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.response?.data?.errors?.join(', ') || err.message || 'An unexpected error occurred.';
      setProductFormError(errorMessage);
      console.error('Product operation failed:', err.response?.data || err.message);
    } finally {
      setProductFormLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        setLoading(true); // Set main loading for deletion
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


  // --- Individual Stock Adjustment Handlers ---
  const handleAdjustStockClick = (product) => {
    setAdjustingProduct(product);
    setStockChangeQuantity(0); // Reset quantity for new adjustment
    setStockAdjustError(null); // Clear previous errors
    setShowAdjustStockModal(true);
  };

  const handleCloseAdjustStockModal = () => {
    setShowAdjustStockModal(false);
    setAdjustingProduct(null);
    setStockChangeQuantity(0);
    setStockAdjustError(null);
    setIsAdjustingStock(false); // Reset loading state
  };

  const handleStockChange = (e) => {
    // Parse as integer, default to 0 if not a valid number
    const value = parseInt(e.target.value, 10);
    setStockChangeQuantity(isNaN(value) ? 0 : value);
  };

  const handleSubmitStockAdjustment = async () => {
    if (stockChangeQuantity === 0) {
      setStockAdjustError("Change quantity cannot be zero. Enter a positive or negative number.");
      return;
    }

    if (!adjustingProduct || !adjustingProduct.id) {
        setStockAdjustError("No product selected for stock adjustment.");
        return;
    }

    setIsAdjustingStock(true);
    setStockAdjustError(null);

    try {
      const updatedProduct = await productsService.adjustProductStock(
        adjustingProduct.id,
        stockChangeQuantity
      );
      // Update the product in the local state with the new stock, using the data from the API response
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.id === updatedProduct.id ? { ...p, stock: updatedProduct.stock } : p
        )
      );
      alert(`Stock for ${updatedProduct.title} updated to ${updatedProduct.stock}.`);
      handleCloseAdjustStockModal();
    } catch (err) {
      console.error("Error adjusting stock:", err.response ? err.response.data : err);
      const errorMessage = err.response?.data?.error || err.message || "Failed to adjust stock. Please try again.";
      setStockAdjustError(errorMessage);
    } finally {
      setIsAdjustingStock(false);
    }
  };

  // --- Bulk Stock Upload Handlers ---
  const handleCloseBulkUploadModal = () => {
    setShowBulkUploadModal(false);
    setSelectedFile(null);
    setIsBulkUploading(false);
    setBulkUploadError(null);
    setBulkUploadResult(null); // Clear previous results
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Get the first file selected
    setBulkUploadError(null); // Clear previous errors
    setBulkUploadResult(null); // Clear previous results
  };

  const handleBulkUploadSubmit = async () => {
    if (!selectedFile) {
      setBulkUploadError("Please select a file to upload.");
      return;
    }

    setIsBulkUploading(true);
    setBulkUploadError(null);
    setBulkUploadResult(null);

    try {
      const result = await productsService.bulkUploadProductStock(selectedFile);
      setBulkUploadResult(result.summary); // Assuming backend sends { summary: { success_count, ... } }
      alert("Bulk upload process started. Check summary for details.");
      fetchSellerProducts(); // Re-fetch products to show updated stock
      // Optional: Keep modal open to show results, or close if all clear: handleCloseBulkUploadModal();
    } catch (err) {
      console.error("Bulk upload failed:", err.response ? err.response.data : err);
      const errorMessage = err.response?.data?.error || err.message || "An error occurred during bulk upload.";
      setBulkUploadError(errorMessage);
    } finally {
      setIsBulkUploading(false);
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
        <div className="flex space-x-4"> {/* Group buttons */}
          <button
            onClick={handleAddProductClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200"
          >
            Add New Product
          </button>
          <button
            onClick={() => setShowBulkUploadModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200"
          >
            Bulk Stock Upload
          </button>
        </div>
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
                  ID
                </th>
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
                    {product.id}
                  </td>
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
                      onClick={() => handleAdjustStockClick(product)}
                      className="text-yellow-600 hover:text-yellow-800 mr-4"
                    >
                      Adjust Stock
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
        show={showProductModal}
        onClose={handleCloseProductModal}
        title={currentProduct ? 'Edit Product' : 'Add New Product'}
      >
        <ProductForm
          initialData={currentProduct}
          onSubmit={handleSubmitProduct}
          loading={productFormLoading}
          error={productFormError}
          isEditMode={isEditMode}
        />
      </Modal>

      {/* Individual Adjust Stock Modal */}
      <Modal
        show={showAdjustStockModal}
        onClose={handleCloseAdjustStockModal}
        title={`Adjust Stock for ${adjustingProduct?.title || ''}`}
      >
        <div className="p-4"> {/* Use p-4 for padding consistent with Tailwind */}
          <p className="text-lg mb-4">Current Stock: <span className="font-semibold">{adjustingProduct?.stock}</span></p>
          <div className="mb-4">
            <label htmlFor="stockChange" className="block text-sm font-medium text-gray-700 mb-1">
              Change Quantity (e.g., +5, -2):
            </label>
            <input
              type="number"
              id="stockChange"
              value={stockChangeQuantity}
              onChange={handleStockChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter a positive or negative number"
              min={adjustingProduct?.stock > 0 ? -adjustingProduct.stock : undefined} // Can't go below 0
              step="1"
            />
            {stockAdjustError && <p className="mt-2 text-sm text-red-600">{stockAdjustError}</p>}
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={handleCloseAdjustStockModal}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              disabled={isAdjustingStock}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitStockAdjustment}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={isAdjustingStock}
            >
              {isAdjustingStock ? 'Adjusting...' : 'Submit Adjustment'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Bulk Stock Upload Modal */}
      <Modal
        show={showBulkUploadModal}
        onClose={handleCloseBulkUploadModal}
        title="Bulk Upload Product Stock"
      >
        <div className="p-4">
          <p className="text-sm text-gray-600 mb-4">
            Upload an Excel (.xlsx) or CSV (.csv) file to adjust product stock in bulk.
            The file should have **two columns**:
            <ul className="list-disc list-inside mt-2 ml-4">
                <li>`product_id` (or `sku` if you prefer to identify by SKU)</li>
                <li>`change_quantity` (a positive number to add, a negative number to subtract)</li>
            </ul>
            <span className="font-semibold text-red-700">Example CSV:</span><br/>
            `product_id,change_quantity`<br/>
            `101,5`<br/>
            `102,-2`<br/>
            `103,15`
          </p>
          <div className="mb-4">
            <label htmlFor="bulkStockFile" className="block text-sm font-medium text-gray-700 mb-1">
              Select File:
            </label>
            <input
              type="file"
              id="bulkStockFile"
              onChange={handleFileChange}
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {bulkUploadError && <p className="mt-2 text-sm text-red-600">{bulkUploadError}</p>}
            {bulkUploadResult && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md text-sm">
                <p className="font-semibold mb-1">Upload Summary:</p>
                <p>Successful updates: <span className="text-green-600">{bulkUploadResult.success_count}</span></p>
                <p>Failed updates: <span className="text-red-600">{bulkUploadResult.failure_count}</span></p>
                {bulkUploadResult.errors && bulkUploadResult.errors.length > 0 && (
                  <div className="mt-2">
                    <p className="font-semibold text-red-700">Errors encountered:</p>
                    <ul className="list-disc list-inside text-red-600">
                      {bulkUploadResult.errors.map((err, index) => (
                        <li key={index}>
                          {err.message}
                          {err.row && ` (Row data: ${JSON.stringify(err.row)})`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={handleBulkUploadSubmit}
              className="px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:opacity-50"
              disabled={!selectedFile || isBulkUploading}
            >
              {isBulkUploading ? 'Uploading...' : 'Upload Stock File'}
            </button>
            <button
              onClick={handleCloseBulkUploadModal}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              disabled={isBulkUploading}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SellerDashboardPage;