import { Selector } from "react-redux";
import { RootState } from "@/app/store";
import { UserType } from "@/features/user/userType";

// Select user token from store
export const selectUserIdToken: Selector<RootState, string | null> = state => state.user.idToken;
export const selectUserIsAuthentificated: Selector<RootState, boolean> = state => state.user.idToken !== null && state.user.idToken !== '';

// Select user info from store
export const selectUserInfo: Selector<RootState, UserType | null> = state => state.user.info;