import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const login = async (email, password) => {
  const response = await api.post('/user/login', { email, password });
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get('/user/profile');
  return response.data.body;
};

export default api;