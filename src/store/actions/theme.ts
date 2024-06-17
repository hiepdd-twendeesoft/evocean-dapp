import { createAsyncThunk } from '@reduxjs/toolkit'

import { TCreateTheme } from '@/models/theme.type'
import { createTheme } from '@/services/theme'

export const createThemeAction = createAsyncThunk(
  'auth/loginAction',
  async (
    payload: TCreateTheme,
    { fulfillWithValue, rejectWithValue }
  ) => {
    console.log('waiting..')
    const res = await createTheme(payload)
    console.log('res', res)
    if (res.status === 200) {
      return fulfillWithValue(res.data)
    }
    return rejectWithValue(res);
  }
)