// api/admin.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin/';

export const getUsers = async () => {
    return axios.get(`${API_URL}users`);
};

export const assignRole = async (userId, roleName) => {
    return axios.post(`${API_URL}assignRole`, { userId, roleName });
};
