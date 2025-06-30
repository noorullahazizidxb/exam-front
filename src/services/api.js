import axios from 'axios';

const usersApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

const notificationsApi = axios.create({
  baseURL: 'http://localhost:3001/api',
});

const getToken = () => localStorage.getItem('token');

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const register = (userData) => usersApi.post('/users/register', userData);
export const login = (credentials) => usersApi.post('/users/login', credentials);

export const createNotification = (notificationData) => notificationsApi.post('/notifications', notificationData, getAuthHeaders());
export const getNotifications = () => notificationsApi.get('/notifications', getAuthHeaders());
export const markAsRead = (id) => notificationsApi.put(`/notifications/${id}/read`, {}, getAuthHeaders());
