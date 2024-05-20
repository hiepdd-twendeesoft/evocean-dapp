import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '.'
import { googleLoginAction } from '../actions/auth'
import { IAccountInfo } from '@/models/user.type'


interface IAuth {
  accessToken?: string
  accountInfo?: IAccountInfo | null,
  isLogin: boolean,
  loadings: Record<string, boolean | undefined>
}

const initialState: IAuth = {
  accountInfo: null,
  isLogin: false,
  accessToken: '',
  loadings: {},
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload?.access_token
    },
    logout: () => {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder.addCase(googleLoginAction.pending, (state) => {
    })
    builder.addCase(googleLoginAction.fulfilled, (state, action) => {
      state.accessToken = action.payload?.accessToken
      state.accountInfo = action.payload?.user;
      state.isLogin = true;
    })
    builder.addCase(googleLoginAction.rejected, (state) => {
      state.accessToken = ''
    })
  }
})

export const authActions = {
  ...authSlice.actions,
}

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
