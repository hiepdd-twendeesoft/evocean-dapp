import { AnyAction, Reducer } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import authReducer from './auth'

export * from './auth'


const productReducer = combineReducers({
  auth: authReducer,
})
  
export type RootState = ReturnType<typeof productReducer>

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'RESET') {
    state = {} as RootState
    sessionStorage.clear()
  }
  return productReducer(state, action)
}
export default rootReducer
