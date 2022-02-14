import { configureStore } from '@reduxjs/toolkit'
import { loadState } from './config/browserStorage'
import authReducer from './slices/authSlice'
import borrowerReducer from './slices/borrowerSlice'
import lenderReducer from './slices/lenderSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    borrowers: borrowerReducer,
    lenders: lenderReducer
  },
  preloadedState: loadState()
})