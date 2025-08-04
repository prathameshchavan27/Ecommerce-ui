import api from './axiosInstance';

const categoriesService = {
    getAllCategories: async () => {
        const response = await api.get('/public/categories')
        console.log(response)
        return response.data
    },
    
    getPublicCategory: async (id) => {
        const response = await api.get(`/public/categories/${id}`);
        return response.data; // Assuming backend sends single category object
    },

  
    createCategory: async (categoryData) => {
        const response = await api.post('/admin/categories', { category: categoryData });
        return response.data;
    },
    updateCategory: async (id, categoryData) => {
        const response = await api.put(`/admin/categories/${id}`, { category: categoryData });
        return response.data;
    },
    deleteCategory: async (id) => {
        const response = await api.delete(`/admin/categories/${id}`);
        return response.data; // Typically 204 No Content for successful delete, but API might send confirmation.
    },
    
}

export default categoriesService;