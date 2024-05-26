import { createSlice } from '@reduxjs/toolkit';
import { UserType } from '@/features/user/userType';

type UserStateType = {
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
    setUser: (state, action) => {
      state.info = action.payload.user;
      localStorage.setItem('userState', JSON.stringify(action.payload.user));
    },
    removeUser: (state) => {
      state.info = null;
      localStorage.removeItem('userState');
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



export const { setUser, removeUser, changeMode } = userSlice.actions;

export default userSlice.reducer;
