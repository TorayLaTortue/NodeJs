import { AppDispatch } from "@/app/store";
import { removeCredentials } from "@/features/auth/authSlice";
import { removeUser } from "@/features/user/userSlice";

export const logout = () => (dispatch: AppDispatch) => {
    dispatch(removeUser());
    dispatch(removeCredentials());
  };