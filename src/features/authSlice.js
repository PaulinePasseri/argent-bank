import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    profileSuccess: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loginSuccess, loginFailure, logout, profileSuccess } = authSlice.actions;
export default authSlice.reducer;

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/api/v1/user/login', { email, password });
    const { token } = response.data;
    
    localStorage.setItem('token', token);

    dispatch(loginSuccess({ user: { email }, token }));
  } catch (error) {
    dispatch(loginFailure('Invalid credentials'));
  }
};

export const fetchUserProfile = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:3001/api/v1/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(profileSuccess(response.data.body));
  } catch (error) {
    dispatch(logout());
  }
};