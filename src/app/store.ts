import employeesReducer from '@/app/app-slice'
import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
  },
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk = ThunkAction<void, RootState, unknown, Action>
