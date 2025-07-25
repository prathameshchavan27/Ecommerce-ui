// src/api/auth.js
import api from './axiosInstance';

const authService = {
  login: async (credentials) => {
    const response = await api.post('/login', credentials);
    // Assuming your API returns a token upon successful login
    if (response.data && response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user',JSON.stringify(response.data.user))
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/register', userData);
    // You might also get a token here or require login after registration
    if (response.data && response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user',JSON.stringify(response.data.user))
    }
    return response.data;
  },

  logout: async () => {
    // Assuming your API has a logout endpoint, otherwise just clear token
    try {
      await api.delete('/logout'); // Example if backend supports token invalidation
    } catch (error) {
      console.warn("Logout failed on backend, but token cleared locally.", error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      // Potentially redirect or update auth state
    }
  }
};

export default authService;