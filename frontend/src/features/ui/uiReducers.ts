import { PayloadAction } from "@reduxjs/toolkit";
import { ModeStateType } from "./uiSlice";

export type AUTH_SET_MODE_ACTION_TYPE = {
    mode: "light" | "dark";
};

// Action to set user mode in the store
const setMode = (state: ModeStateType, action: PayloadAction<AUTH_SET_MODE_ACTION_TYPE>) => {
    state.mode = action.payload.mode; // Access the mode property
    localStorage.setItem('modeState', JSON.stringify(action.payload.mode)); // Store just the mode
};

// Action to remove user mode from the store
const resetMode = () => {
    localStorage.removeItem('modeState');
};

const changeMode = (state: ModeStateType) => {
    if (state.mode === 'light') {
        state.mode = 'dark';
        localStorage.setItem('mode', 'dark');
    } else {
        state.mode = 'light';
        localStorage.setItem('mode', 'light');
    }
};

export default {
    setMode,
    resetMode,
    changeMode
};
