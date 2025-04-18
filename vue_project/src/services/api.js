import axios from "axios";

// const API_BASE = "http://localhost:8080/api";
// const API_BASE = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });
const API_BASE =
  " https://internshipproject-tienb2b.onrender.com/api " ||
  "http://localhost:8080/api";

export const api = {
  customers: {
    getAll: () => axios.get(`${API_BASE}/customers`),
    get: (id) => axios.get(`${API_BASE}/customers/${id}`),
    create: (data) => axios.post(`${API_BASE}/customers`, data),
    update: (id, data) => axios.put(`${API_BASE}/customers/${id}`, data),
    delete: (id) => axios.delete(`${API_BASE}/customers/${id}`),
  },
  // Tương tự cho tasks, interactions, users
};
