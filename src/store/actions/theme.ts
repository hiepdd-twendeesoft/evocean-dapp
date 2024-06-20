import { createAsyncThunk } from '@reduxjs/toolkit'

import { TCreateTheme } from '@/models/theme.type'
import { createTheme, updateTheme } from '@/services/theme'

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

export const updateThemeAction = createAsyncThunk(
  'themes/updateTheme',
  async (
    payload: TCreateTheme,
    { fulfillWithValue, rejectWithValue }
  ) => {
    const {id, ...data} = payload
    if(id) {
      const res = await updateTheme(id, data)
      if (res.status === 200) {
        return fulfillWithValue(res.data)
      }
      return rejectWithValue(res);
    }
  }
)
