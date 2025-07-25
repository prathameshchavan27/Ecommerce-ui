// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // <--- IMPORTANT: SET YOUR ACTUAL API BASE URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Or wherever your token is stored
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error Response:', error.response.data);
      if (error.response.status === 401) {
        console.log("Unauthorized, please log in.");
        // Example: Redirect to login page
        // window.location.href = '/login';
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;