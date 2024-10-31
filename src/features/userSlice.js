import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    firstName: '',
    lastName: '',
    email: '',
    error: null,
  },
  reducers: {
    setUserProfile: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetUser: (state) => {
      Object.assign(state, userSlice.initialState);
    },
  },
});

export const { setUserProfile, setError, resetUser } = userSlice.actions;
export default userSlice.reducer;