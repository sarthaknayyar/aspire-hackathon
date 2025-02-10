import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const login = async (email) => {
    const response = await axios.post(`${API_URL}/login`, { email });
    return response.data;
};

export const getRequestsByDepartment = async (department) => {
    const response = await axios.get(`${API_URL}/requests/${department}`);
    return response.data;
};

export const getRequestById = async (id) => {
    const response = await axios.get(`${API_URL}/request/${id}`);
    return response.data;
};

export const updateRequest = async (id, data) => {
    const response = await axios.put(`${API_URL}/request/${id}`, data);
    return response.data;
};
