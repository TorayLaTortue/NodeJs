import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nullUserType, UserType } from '@/features/user/userType';
import reducers from '@/features/user/userReducers';
import { fetchAllUsers, fetchUserById, postNewUser, UpdateUserById } from '@/features/user/userServices';
import { RequestState } from "@/types/appTypes";
import selectors from '@/features/user/userSelectors';

// imports, thunk action creator & slice omitted
export type UserStateType = {
  status: RequestState;
  error: string;
  data: UserType;
  user: UserType;
  users: UserType[];
}

const loadUserStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('userState');
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
  user: nullUserType,
  users: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers,
  selectors,
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.pending, (state) => {
      state.status = RequestState.pending;
      state.error = ''; // Clear error on pending
    })
    .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      state.status = RequestState.fulfilled;
    })
    .addCase(fetchUserById.rejected, (state, action) => {
      state.status = RequestState.rejected;
      state.error = action.payload ? action.payload.message : 'Unknown error occurred';
    })
    
    .addCase(fetchAllUsers.pending, (state) => {
      state.status = RequestState.pending;
      state.error = ''; // Clear error on pending
    })
    .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<UserType[]>) => {
      state.users = action.payload;
      state.status = RequestState.fulfilled;
    })
    .addCase(fetchAllUsers.rejected, (state, action) => {
      state.status = RequestState.rejected;
      state.error = action.payload ? action.payload.message : 'Unknown error occurred';
    })

    .addCase(UpdateUserById.pending, (state) => {
      state.status = RequestState.pending;
      state.error = ''; // Clear error on pending
    })
    .addCase(UpdateUserById.fulfilled, (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      state.status = RequestState.fulfilled;
    })
    .addCase(UpdateUserById.rejected, (state, action) => {
      state.status = RequestState.rejected;
      state.error = action.payload ? action.payload.message : 'Unknown error occurred';
    })

    .addCase(postNewUser.pending, (state) => {
      state.status = RequestState.pending;
      state.error = ''; // Clear error on pending
    })
    .addCase(postNewUser.fulfilled, (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      state.status = RequestState.fulfilled;
    })
    .addCase(postNewUser.rejected, (state, action) => {
      state.status = RequestState.rejected;
      state.error = action.payload ? action.payload.message : 'Unknown error occurred';
    });
  },
});



export const userActions = userSlice.actions;
export const userSelectors = userSlice.selectors;

export default userSlice.reducer;
