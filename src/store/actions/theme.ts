import { createAsyncThunk } from '@reduxjs/toolkit'

import { TCreateTheme } from '@/models/theme.type'
import { createTheme } from '@/services/theme'

export const createThemeAction = createAsyncThunk(
  'themes/createTheme',
  async (
    payload: TCreateTheme,
    { fulfillWithValue, rejectWithValue }
  ) => {
    const res = await createTheme(payload)
    if (res.status === 200) {
      return fulfillWithValue(res.data)
    }
    return rejectWithValue(res);
  }
)
