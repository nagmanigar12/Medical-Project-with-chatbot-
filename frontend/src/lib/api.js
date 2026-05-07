import axios from "axios";

// In development use the backend on localhost:3000, otherwise use relative /api
const devBackend = import.meta.env.DEV ? (import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000') : '';
const baseURL = devBackend ? `${devBackend}/api` : '/api';

const api = axios.create({
  baseURL,
});

// Add interceptor to include token
api.interceptors.request.use((config) => {
  const storedUser = localStorage.getItem("medi_sync_user");
  if (storedUser) {
    const { token } = JSON.parse(storedUser);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;

