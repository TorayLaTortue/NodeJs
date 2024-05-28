import { createSlice } from '@reduxjs/toolkit';
import reducers from '@/features/auth/authReducers';

export type AuthStateType = {
  idToken: string | null;
}

const loadAuthStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) return undefined;
    else return JSON.parse(serializedState) as AuthStateType;
  } catch (err) {
    return undefined;
  }
};

const initialState: AuthStateType = loadAuthStateFromLocalStorage() || {
  idToken: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers,
});

export const { setCredentials, removeCredentials } = authSlice.actions;
export default authSlice.reducer;
