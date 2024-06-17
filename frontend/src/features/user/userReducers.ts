import { PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "./userType";

import { initialState, UserStateType } from "./userSlice";

export type AUTH_SET_USER_ACTION_TYPE = UserType;

// Action to set user credential on store
const setUser = (state: UserStateType, action: PayloadAction<AUTH_SET_USER_ACTION_TYPE>) => {
    state.data = action.payload;
    localStorage.setItem('userState', JSON.stringify(action.payload));
};

// Action to remove user credential on store
const resetUser = (state: UserStateType) => {
    localStorage.removeItem('userState');
    state.data = initialState.data;
    state.error = initialState.error;
    state.status = initialState.status;
    state.users = initialState.users;
};

export default {
    setUser,
    resetUser
};