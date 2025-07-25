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
    return response.data;
  },

}

export default productsService;