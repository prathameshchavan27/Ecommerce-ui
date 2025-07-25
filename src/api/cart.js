// src/api/cart.js
import api from './axiosInstance';

const cartService = {
  // Customer routes (require authentication via interceptor)
  getCart: async () => {
    // '/customer/cart' matches your Rails route
    const response = await api.get('/customer/cart');
    console.log(response.data)
    return response.data.cart;
  },
  clearCart: async () => {
    // '/customer/cart/clear' matches your Rails route
    const response = await api.delete('/customer/cart/clear');
    return response.data;
  },
  addCartItem: async (itemData) => {
    // '/customer/cart_items' matches your Rails route
    const response = await api.post('/customer/cart_items', itemData);
    return response.data;
  },
  updateCartItem: async (id, quantity) => {
    const response = await api.patch(`/customer/cart_items/${id}`, { quantity });
    return response.data;
  },
  deleteCartItem: async (id) => {
    const response = await api.delete(`/customer/cart_items/${id}`);
    return response.data;
  }
};

export default cartService;