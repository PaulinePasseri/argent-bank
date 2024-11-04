import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: localStorage.getItem('firstName') || '',
  lastName: localStorage.getItem('lastName') || '',
  email: '',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.error = null;
    },
    setName: (state, action) => {
      state.firstName = action.payload.firstName;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetUser: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setUserProfile, setError, setName, resetUser } = userSlice.actions;
export default userSlice.reducer;