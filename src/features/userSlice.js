import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: '',
  lastName: '',
  userName: localStorage.getItem('userName') || '',
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
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetUser: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setUserProfile, setError, setUserName, resetUser } = userSlice.actions;
export default userSlice.reducer;