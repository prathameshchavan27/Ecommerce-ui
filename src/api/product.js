import api from './axiosInstance';

const productsService = {
  // Public routes
  getPublicProducts: async (params) => {
    // '/public/products' matches your Rails route
    const response = await api.get('/public/products', { params });
    return response.data;
  },
  getPublicProductById: async (id) => {
    // This matches your Rails route: /api/v1/public/products/:id
    const response = await api.get(`/public/products/${id}`);
    console.log(response)
    return response.data.product;
  },

  getSellerProducts: async() => {
    const response = await api.get(`/seller/products`);
    return response.data.products;
  },

  getSellerProductById: async(id) => {
    const response = await api.get(`/public/products/${id}`);
    return response.data.product;
  },
  
  deleteProduct: async(id) => {
    const response = await api.delete(`/seller/products/${id}`);
    return response.data;
  },

  updateProduct: async(id,productData) => {
    const response = await api.put(`/seller/products/${id}`,  productData);
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await api.post('/seller/products', {product: productData });
    return response.data;
  },

  adjustProductStock: async (id, quantity) => {
    const response = await api.patch(`/seller/products/${id}/adjust_stock`, {change_quantity: quantity});
    return response.data.product;
  },

  bulkUploadProductStock: async (fileToUpload) => { // Expects the actual File object here
    console.log('File object received by bulkUploadProductStock:', fileToUpload);

    if (!(fileToUpload instanceof File)) {
      console.error("bulkUploadProductStock expected a File object, but received:", fileToUpload);
      // You might throw an error or handle this more gracefully for the user
      throw new Error("Invalid file for upload. Please select a file.");
    }

    const formData = new FormData();
    // 'file' must match the parameter name expected by your Rails backend (params[:file])
    formData.append('file', fileToUpload);

    try {
      const response = await api.post(
        // IMPORTANT: Use the correct backend route: /bulk_stock_upload, not /bulk_upload
        '/seller/products/bulk_stock_upload',
        formData, // Send the FormData object directly
        {
          headers: {
            // This header is essential. Axios will usually set the 'boundary' itself
            // when you pass FormData, but specifying the type ensures correctness.
            'Content-Type': 'multipart/form-data',
            // Ensure your Authorization header is handled by your Axios 'api' instance
            // or explicitly add it here if needed (e.g., 'Authorization': `Bearer ${token}`)
          },
        }
      );
      console.log('Bulk upload API response:', response.data);
      return response.data; // This will return the summary object (message, summary, errors)
    } catch (error) {
      console.error('Error in bulkUploadProductStock:', error.response ? error.response.data : error.message);
      throw error; // Re-throw the error for the calling component to handle
    }
  }
}

export default productsService;