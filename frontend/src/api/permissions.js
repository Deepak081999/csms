// api/permissions.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/permissions/';

export const createPermission = async (permissionName) => {
    return axios.post(`${API_URL}create`, { name: permissionName });
};
