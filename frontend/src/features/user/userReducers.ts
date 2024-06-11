import { PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "./userType";

import { initialState, UserStateType } from "./userSlice";

export type AUTH_SET_USER_ACTION_TYPE = UserType;
/* {
    info: UserType;
    mode: 'light' | 'dark';
} */

// Action to set user credential on store
const setUser = (state: UserStateType, action: PayloadAction<AUTH_SET_USER_ACTION_TYPE>) => {
    state.data = action.payload;
    localStorage.setItem('userState', JSON.stringify(action.payload));
    // console.log(localStorage.getItem('userState'), "local storage");
};

// Action to remove user credential on store
const resetUser = (state: UserStateType) => {
    localStorage.removeItem('userState');
    state.data = initialState.data;
    state.error = initialState.error;
    state.status = initialState.status;
};

/* const changeMode = (state: UserStateType) => {
    if (state.mode === 'light') {
      state.mode = 'dark';
      localStorage.setItem('mode', 'dark');
    } else {
      state.mode = 'light';
      localStorage.setItem('mode', 'light');
    }
} */

export default {
    setUser,
    resetUser
    // changeMode
};