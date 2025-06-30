import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (userData) => api.post('/users/register', userData);

export const login = async (credentials) => {
  const response = await api.post('/users/login', credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response;
};

export const getNotifications = () => api.get('/notifications');
export const createNotification = (notificationData) => api.post('/notifications', notificationData);
export const markAsRead = (id) => api.put(`/notifications/${id}/read`);

export default api;
