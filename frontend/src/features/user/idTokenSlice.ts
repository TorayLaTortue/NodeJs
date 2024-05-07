/* import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IdTokenState {
  idToken: string | null;
}

const initialState: IdTokenState = {
  idToken: null,
};

const idTokenSlice = createSlice({
  name: 'idToken',
  initialState,
  reducers: {
    setIdToken: (state, action: PayloadAction<string>) => {
      console.log(state.idToken)
      state.idToken = action.payload;
      console.log(state.idToken)
    },
    clearIdToken: (state) => {
      state.idToken = null;
    },
  },
});

export const { setIdToken, clearIdToken } = idTokenSlice.actions; 
export default idTokenSlice.reducer; */