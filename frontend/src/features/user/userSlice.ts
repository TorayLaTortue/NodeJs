import { createSlice } from '@reduxjs/toolkit';
import { nullUserType, UserType } from '@/features/user/userType';
import reducers from '@/features/user/userReducers';

export type UserStateType = {
  info: UserType;
  mode: 'light' | 'dark';
}

const loadUserStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('userState');
    console.log("serializedstate", serializedState);
    if (serializedState === null) return undefined;
    else return JSON.parse(serializedState) as UserType;
  } catch (err) {
    return undefined;
  }
};

const initialState: UserStateType = {
  info: loadUserStateFromLocalStorage() || nullUserType,
  mode: localStorage.getItem('mode')
    ? localStorage.getItem('mode') as 'light' | 'dark'
    : window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers,
});



export const { setUser, removeUser, changeMode } = userSlice.actions;

export default userSlice.reducer;
