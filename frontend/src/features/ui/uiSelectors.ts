import { Selector } from "react-redux";
import { ModeStateType } from "./uiSlice";

// Select user info from store
const selectUserState: Selector<ModeStateType, ModeStateType> = state => state;

export default {
    selectUserState,
}