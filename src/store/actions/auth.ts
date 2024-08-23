import { createAsyncThunk } from '@reduxjs/toolkit';

import { OAuthLoginDto } from '@/models/auth.type';
import { googleLogin, walletLogin } from '@/services/auth';
import secureStorage from '@/utils/secureStorage';
import { Strorages } from '@/models/storage.enum';
import { IAuth } from '../slices';

export const googleLoginAction = createAsyncThunk(
  'auth/loginAction',
  async (payload: OAuthLoginDto, { fulfillWithValue, rejectWithValue }) => {
    console.log('login');
    const res = await googleLogin(payload);
    if (res.status === 200) {
      secureStorage.setItem(Strorages.AccessToken, res.data.accessToken);
      secureStorage.setItem(Strorages.RefreshToken, res.data.refreshToken);
      return fulfillWithValue(res.data);
    }
    return rejectWithValue(res);
  }
);

export const walletLoginAction = createAsyncThunk(
  'auth/loginAction',
  async (payload: string, { fulfillWithValue, rejectWithValue }) => {
    const res = await walletLogin({ address: payload });
    if (res) {
      secureStorage.setItem(Strorages.AccessToken, res.data.accessToken);
      secureStorage.setItem(Strorages.RefreshToken, res.data.refreshToken);
      return fulfillWithValue(res.data);
    }
    return rejectWithValue(res);
  }
);
