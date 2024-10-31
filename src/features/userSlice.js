import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserProfile = createAsyncThunk(
    'user/fetchProfile',
    async (_, { getState, rejectWithValue }) => {
      try {
        const { auth } = getState();
        const token = auth.token || localStorage.getItem('token');
  
        if (!token) {
          throw new Error('No token available');
        }
  
        const response = await axios.get('http://localhost:3001/api/v1/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data.body;
      } catch (error) {
        return rejectWithValue(error.response ? error.response.data : { message: error.message });
      }
    }
  );

const userSlice = createSlice({
  name: 'user',
  initialState: {
    firstName: '',
    lastName: '',
    email: '',
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        console.log('fetchUserProfile: pending');
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        console.log('fetchUserProfile: fulfilled', action.payload);
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.email = action.payload.email;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        console.log('fetchUserProfile: rejected', action.payload);
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default userSlice.reducer;