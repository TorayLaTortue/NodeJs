import { createSlice } from '@reduxjs/toolkit';

type AuthStateType = {
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
  reducers: {
    setCredentials: (state, action) => {
      state.idToken = action.payload.idToken;
      localStorage.setItem('authState',  JSON.stringify(action.payload));
    },
    removeCredentials: (state) => {
      state.idToken = null;
      localStorage.removeItem('authState');
    },
  },
});

export const { setCredentials, removeCredentials } = authSlice.actions;

export default authSlice.reducer;
