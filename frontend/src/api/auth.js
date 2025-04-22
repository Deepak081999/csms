// api/auth.js
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api/auth/',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Register API call
export const register = async (formData) => {
    try {
        const response = await API.post('register', formData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Registration failed' };
    }
};

// Login API call
export const login = async (formData) => {
    try {
        const response = await API.post('login', formData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Login failed' };
    }
};
