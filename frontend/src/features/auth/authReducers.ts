import { AuthStateType } from "@/features/auth/authSlice";
import { PayloadAction } from "@reduxjs/toolkit";

export type AUTH_SET_CREDENTIAL_ACTION_TYPE = {
    idToken: string;
}

// Action to set user credential on store
const setCredentials = (state: AuthStateType, action: PayloadAction<AUTH_SET_CREDENTIAL_ACTION_TYPE>) => {
    console.log('setCredentials', state, action.payload.idToken);
    state.idToken = action.payload.idToken;
    localStorage.setItem('authState',  JSON.stringify(action.payload));
};

// Action to remove user credential on store
const removeCredentials = (state: AuthStateType) => {
    state.idToken = null;
    localStorage.removeItem('authState');
};

export default {
    setCredentials,
    removeCredentials
};