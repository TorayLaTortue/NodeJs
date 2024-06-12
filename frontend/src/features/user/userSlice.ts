import { createSlice } from '@reduxjs/toolkit';
import { nullUserType, UserType } from '@/features/user/userType';
import reducers from '@/features/user/userReducers';
import { fetchUserById } from '@/features/user/userServices';
import { RequestState } from "@/types/appTypes";
import selectors from '@/features/user/userSelectors';

// imports, thunk action creator & slice omitted
export type UserStateType = {
  status: RequestState;
  error: string;
  data: UserType;
}

const loadUserStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('userState');
    console.log("serializedstate", serializedState);
    if (serializedState === null) return undefined;
    else return JSON.parse(serializedState) as UserType;
  } catch (err) {
    return undefined;
  }
};

export const initialState: UserStateType = {
  status: RequestState.idle,
  error: '',
  data: loadUserStateFromLocalStorage() || nullUserType,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers,
  selectors,
  extraReducers: (builder) => {
    // When our request is pending:
    // - store the 'pending' state as the status for the corresponding pokemon name
    builder.addCase(fetchUserById.pending, (state) => {
      state.status = RequestState.pending;
    })
    // When our request is fulfilled:
    // - store the 'fulfilled' state as the status for the corresponding pokemon name
    // - and store the received payload as the data for the corresponding pokemon name
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = RequestState.fulfilled;
    })
    // When our request is rejected:
    // - store the 'rejected' state as the status for the corresponding pokemon name
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.status = RequestState.rejected;
      state.error = action.payload ? action.payload.message : 'Errur inconnu';
    })
  },
});



export const userActions = userSlice.actions;
export const userSelectors = userSlice.selectors;

export default userSlice.reducer;
