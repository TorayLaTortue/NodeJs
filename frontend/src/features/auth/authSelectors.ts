import { Selector } from "react-redux";
import { RootState } from "@/app/store";

// Select user token from store
export const selectAuthIdToken: Selector<RootState, string | null> = state => state.auth.idToken;

export const selectIsAuthentificated: Selector<RootState, boolean> = state => state.auth.idToken !== null && state.auth.idToken !== '' && state.user.data !== null && state.user.data.uid !== '' ;