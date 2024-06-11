import { Selector } from "react-redux";
import { UserType } from "@/features/user/userType";
import { UserStateType } from "./userSlice";
import { RequestState } from "@/types/appTypes";

// Select user info from store
const selectUserState: Selector<UserStateType, UserStateType> = state => state;
const selectUserInfo: Selector<UserStateType, UserType | null> = state => state.data;
const selectUserStatus: Selector<UserStateType, RequestState> = state => state.status;
const selectUserError: Selector<UserStateType, string> = state => state.error;

export default {
    selectUserState,
    selectUserInfo,
    selectUserStatus,
    selectUserError
}