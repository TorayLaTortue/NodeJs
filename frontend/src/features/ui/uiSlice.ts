import { createSlice } from '@reduxjs/toolkit';
import reducers from '@/features/ui/uiReducers';

export type ModeStateType = {
  mode: "light" | "dark"; 
}

export const initialState: ModeStateType = {
  mode: localStorage.getItem('mode') 
    ? localStorage.getItem('mode') as 'light' | 'dark'
    : window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light', 
};

export const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers,
});



export const modeActions = modeSlice.actions;
export const modeSelectors = modeSlice.selectors;

export default modeSlice.reducer;
