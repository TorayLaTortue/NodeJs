import { PayloadAction } from "@reduxjs/toolkit";
import { nullUserType, UserType } from "./userType";
import { UserStateType } from "./userSlice";

export type AUTH_SET_USER_ACTION_TYPE = {
    info: UserType;
    mode: 'light' | 'dark';
}

// Action to set user credential on store
const setUser = (state: UserStateType, action: PayloadAction<AUTH_SET_USER_ACTION_TYPE>) => {
    console.log('setUser', action);
    state.info = action.payload.info;
    localStorage.setItem('userState', JSON.stringify(action.payload));
    console.log(localStorage.getItem('userState'), "local storage");
};

// Action to remove user credential on store
const removeUser = (state: UserStateType) => {
    state.info = nullUserType;
    localStorage.removeItem('userState');
};

const changeMode = (state: UserStateType) => {
    if (state.mode === 'light') {
      state.mode = 'dark';
      localStorage.setItem('mode', 'dark');
    } else {
      state.mode = 'light';
      localStorage.setItem('mode', 'light');
    }
}

export default {
    setUser,
    removeUser,
    changeMode
};