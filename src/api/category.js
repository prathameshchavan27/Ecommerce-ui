import api from './axiosInstance';

const categoriesService = {
    getAllCategories: async () => {
        const response = await api.get('/public/categories')
        console.log(response)
        return response.data
    }
}

export default categoriesService;