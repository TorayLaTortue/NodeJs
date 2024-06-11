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

export default {};
