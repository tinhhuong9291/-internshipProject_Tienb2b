import axios from "axios";

// const API_BASE = "http://localhost:8080/api";
// const API_BASE = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });
const API_BASE = " https://internshipproject-tienb2b.onrender.com/api ";
// ||"http://localhost:8080/api";

export const api = {
  customers: {
    getAll: () => axios.get(`${API_BASE}/customers`),
    get: (id) => axios.get(`${API_BASE}/customers/${id}`),
    create: (data) => axios.post(`${API_BASE}/customers`, data),
    update: (id, data) => axios.put(`${API_BASE}/customers/${id}`, data),
    delete: (id) => axios.delete(`${API_BASE}/customers/${id}`),
  },
  interactions: {
    getAll: () => axios.get(`${API_BASE}/interactions`),
    get: (id) => axios.get(`${API_BASE}/interactions/${id}`),
    create: (data) => axios.post(`${API_BASE}/interactions`, data),
    update: (id, data) => axios.put(`${API_BASE}/interactions/${id}`, data),
    delete: (id) => axios.delete(`${API_BASE}/interactions/${id}`),
  },
  tasks: {
    getAll: () => axios.get(`${API_BASE}/tasks`),
    get: (id) => axios.get(`${API_BASE}/tasks/${id}`),
    create: (data) => axios.post(`${API_BASE}/tasks`, data),
    update: (id, data) => axios.put(`${API_BASE}/tasks/${id}`, data),
    delete: (id) => axios.delete(`${API_BASE}/tasks/${id}`),
  },
  users: {
    getAll: () => axios.get(`${API_BASE}/users`),
    get: (id) => axios.get(`${API_BASE}/users/${id}`),
    create: (data) => axios.post(`${API_BASE}/users`, data),
    update: (id, data) => axios.put(`${API_BASE}/users/${id}`, data),
    delete: (id) => axios.delete(`${API_BASE}/users/${id}`),
  },
};
