import api from './axiosInstance';

const ordersService = {
    getOrder: async (id) => {
        const response = await api.get(`/customer/orders/${id}`);
        return response.data;
    },

    cancelOrder: async (id) => {
        const response = await api.post(`/customer/orders/${id}/cancel`);
        return response.data;
    }
}

export default ordersService;