import { AppDispatch, RootState } from '@/app/store'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  dispatch: AppDispatch
  state: RootState
}>()
