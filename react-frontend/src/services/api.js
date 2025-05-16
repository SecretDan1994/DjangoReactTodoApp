import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

api.interceptors.request.use((config) => {
  const tokens = JSON.parse(localStorage.getItem('authTokens'));
  if (tokens) {
    config.headers.Authorization = `Bearer ${tokens.access}`;
  }
  return config;
});

export default api;