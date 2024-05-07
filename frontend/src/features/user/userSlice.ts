import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  idToken: null,
  user: null,
  mode: localStorage.getItem('mode')
    ? localStorage.getItem('mode')
    : window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      console.log(state.user);
    },
    setToken: (state, action) => {
      state.idToken = action.payload;
      console.log(state.idToken )
    },
    changeMode: (state) => {
      if (state.mode === 'light') {
        state.mode = 'dark';
        localStorage.setItem('mode', 'dark');
      } else {
        state.mode = 'light';
        localStorage.setItem('mode', 'light');
      }
    },
  },
});



export const { setCredentials, setToken, changeMode } = userSlice.actions;

export default userSlice.reducer;
