import axios from "axios";

const API_URL = "https://jwt-auth-eight-neon.vercel.app";

export const loginService = async (email, password) => {
    try {
        const response = await axios.post(
            `${API_URL}/login`,
            { email, password }
        );

        return response.data;
    } catch (error) {
        throw error.response?.data || { msg: "Login gagal" };
    }
};

export const registerService = async (name, email, password) => {
    try {
        const response = await axios.post(
            `${API_URL}/register`,
            { name, email, password }
        );

        return response.data;
    } catch (error) {
        throw error.response?.data || { msg: "Register gagal" };
    }
};

export const logoutService = async () => {
    // Since the backend uses stateless JWT and the /logout endpoint returns 404,
    // we effectively logout by just clearing the token on the client side.
    // No server request is needed.
    return { msg: "Logout successful" };
};