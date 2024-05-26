import { Selector } from "react-redux";
import { RootState } from "@/app/store";
import { UserType } from "@/features/user/userType";

// Select user info from store
export const selectUserInfo: Selector<RootState, UserType | null> = state => state.user.info;