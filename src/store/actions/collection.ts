import { createAsyncThunk } from "@reduxjs/toolkit";

import { TCreateCollection } from "@/models/collection.type";
import { createCollection, updateCollection } from "@/services/collection";

export const createCollectionAction = createAsyncThunk(
  "collections/createCollection",
  async (payload: TCreateCollection, { fulfillWithValue, rejectWithValue }) => {
    const res = await createCollection(payload);
    return fulfillWithValue(res);
    // return rejectWithValue(res);
  },
);

export const updateCollectionAction = createAsyncThunk(
  "collections/updateCollection",
  async (payload: TCreateCollection, { fulfillWithValue, rejectWithValue }) => {
    const { id, ...data } = payload;
    if (id) {
      const res = await updateCollection(id, data);
      return fulfillWithValue(res);
    }
    // return rejectWithValue(res);
  },
);
