import { createAsyncThunk } from '@reduxjs/toolkit'

import { TCreateCollection } from '@/models/collection.type'
import { createCollection } from '@/services/collection'

export const createCollectionAction = createAsyncThunk(
  'collections/createCollection',
  async (
    payload: TCreateCollection,
    { fulfillWithValue, rejectWithValue }
  ) => {
    const res = await createCollection(payload)
    return fulfillWithValue(res)
    // return rejectWithValue(res);
  }
)
