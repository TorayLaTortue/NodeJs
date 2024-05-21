import { createSlice } from '@reduxjs/toolkit';
import { UserType } from '@/features/user/userType';

type UserStateType = {
  idToken: string | null;
  info: UserType | null;
  mode: 'light' | 'dark';
}

const loadUserStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('userState');
    if (serializedState === null) return undefined;
    else return JSON.parse(serializedState) as UserType;
  } catch (err) {
    return undefined;
  }
};

const initialState: UserStateType = {
  info: loadUserStateFromLocalStorage() || null,
  idToken: localStorage.getItem('token') || null,
  mode: localStorage.getItem('mode')
    ? localStorage.getItem('mode') as 'light' | 'dark'
    : window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.info = action.payload.user;
      state.idToken = action.payload.token;
      localStorage.setItem('userState', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
      console.log(state.info);
    },
    removeCredentials: (state) => {
      state.info = null;
      state.idToken = null;
      localStorage.removeItem('userState');
      localStorage.removeItem('token');
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



export const { setCredentials, removeCredentials, changeMode } = userSlice.actions;

export default userSlice.reducer;
