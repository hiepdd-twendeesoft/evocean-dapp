import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthResponse } from '@/models/auth.type';
import secureStorage from '@/utils/secureStorage';
import { Strorages } from '@/models/storage.enum';

export const googleLoginAction = createAsyncThunk(
  'auth/loginAction',
  async (payload: AuthResponse, { fulfillWithValue, rejectWithValue }) => {
    if (payload) {
      secureStorage.setItem(Strorages.AccessToken, payload.accessToken);
      secureStorage.setItem(Strorages.RefreshToken, payload.refreshToken);
      return fulfillWithValue(payload);
    }
    return rejectWithValue({});
  }
);

export const walletLoginAction = createAsyncThunk(
  'auth/loginAction',
  async (payload: AuthResponse, { fulfillWithValue, rejectWithValue }) => {
    if (payload) {
      secureStorage.setItem(Strorages.AccessToken, payload.accessToken);
      secureStorage.setItem(Strorages.RefreshToken, payload.refreshToken);
      return fulfillWithValue(payload);
    }
    return rejectWithValue({});
  }
);
