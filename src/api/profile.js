import api from './axiosInstance';

const profileService = {
  // Fetch current logged-in user's profile
  getProfile: async () => {
    const response = await api.get('/users/profile'); // adjust endpoint if needed
    return response.data;
  },

  // Update profile (name, email, etc.)
  updateProfile: async (profileData) => {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  },
};

export default profileService;
