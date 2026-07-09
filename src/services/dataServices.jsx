import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://jwt-auth-eight-neon.vercel.app";


export const expensesService = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/expenses`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        // Throw the complete error object to preserve status code
        throw error.response || error;
    }
};

export const goalService = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/goals`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response || error;
    }
};

export const transactionsService = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/transactions`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response || error;
    }
};