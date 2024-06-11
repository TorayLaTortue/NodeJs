import { configureStore } from '@reduxjs/toolkit';
// import { apiSlice } from './api/apiSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import userReducer from '@/features/user/userSlice';
import authReducer from '@/features/auth/authSlice';
import { counterReducer } from '@/features/counterSlice';

const store = configureStore({
  reducer: {
    // [apiSlice.reducerPath]: apiSlice.reducer,
    // Add your reducers here
    counter: counterReducer,
    auth: authReducer,
    user: userReducer,
  },
  devTools: import.meta.env.DEV,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: { 
      extraArgument: {
        token: ''
      }
    }
  }).concat(
    // apiSlice.middleware
  ),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
