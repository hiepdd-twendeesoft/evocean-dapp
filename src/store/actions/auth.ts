import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthResponse } from '@/models/auth.type';
import secureStorage from '@/utils/secureStorage';
import { Strorages } from '@/models/storage.enum';
import { setCookie } from 'cookies-next';

export const googleLoginAction = createAsyncThunk(
  'auth/loginAction',
  async (payload: AuthResponse, { fulfillWithValue, rejectWithValue }) => {
    if (payload) {
      setCookie(Strorages.AccessToken, payload.accessToken, {
        expires: undefined
      });
      setCookie(Strorages.RefreshToken, payload.refreshToken, {
        expires: undefined
      });
      return fulfillWithValue(payload);
    }
    return rejectWithValue({});
  }
);

export const walletLoginAction = createAsyncThunk(
  'auth/loginAction',
  async (payload: AuthResponse, { fulfillWithValue, rejectWithValue }) => {
    if (payload) {
      setCookie(Strorages.AccessToken, payload.accessToken);
      setCookie(Strorages.RefreshToken, payload.refreshToken);
      return fulfillWithValue(payload);
    }
    return rejectWithValue({});
  }
);
