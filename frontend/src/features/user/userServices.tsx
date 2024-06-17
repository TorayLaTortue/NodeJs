import { UserType } from '@/features/user/userType';
import { createAppAsyncThunk } from '@/services/storeServices';
import { api } from '../../services/apiServices';
import { AxiosError } from 'axios';

export const fetchUserById = createAppAsyncThunk<UserType, string>(
  'user/fetchUserById',
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await api.get<{ user: UserType }>(`${import.meta.env.VITE_API_URL}/users/${userId}`);
      return fulfillWithValue(response.data.user);
    } catch (error) {
      return rejectWithValue({
        message: error instanceof AxiosError
          ? error.message
          : 'Erreur inconnue'
      });
    }
  }
);

export const UpdateUserById = createAppAsyncThunk<UserType, {userId: string; displayName: string; photoURL: string; email: string;}>(
  'user/UpdateUserById',
  async ({ userId, displayName, photoURL, email, }, { rejectWithValue, fulfillWithValue }) => {
    console.log(userId, displayName, photoURL, email);
    try {
      const response = await api.put<{ user: UserType }>(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        displayName,
        photoURL,
        email,
      });
      return fulfillWithValue(response.data.user);
    } catch (error) {
      return rejectWithValue({
        message: error instanceof AxiosError
          ? error.message
          : 'Erreur inconnue'
      });
    }
  }
);

export const fetchAllUsers = createAppAsyncThunk<UserType[]>(
  'user/fetchAllUsers',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await api.get<{ users: UserType[] }>(`${import.meta.env.VITE_API_URL}/users`);
      return fulfillWithValue(response.data.users);
    } catch (error) {
      return rejectWithValue({
        message: error instanceof AxiosError
          ? error.message
          : 'Erreur inconnue'
      });
    }
  }
);
export default {};
