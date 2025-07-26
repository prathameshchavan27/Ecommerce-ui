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
  }

}

export default productsService;