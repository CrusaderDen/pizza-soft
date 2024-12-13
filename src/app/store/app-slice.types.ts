import { Employee, Role } from '@/api/app-api.types'
import { AppDispatch, RootState } from '@/app/store/store'
import { createAsyncThunk } from '@reduxjs/toolkit'

export type SortOrder = 'asc' | 'desc' | 'unselected'

export type SortField = 'birthday' | 'name' | 'unselected'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  dispatch: AppDispatch
  state: RootState
}>()

export type EmployeeState = {
  employees: Employee[]
  error: null | string
  loading: boolean
  selectedEmployeesRole: Role[]
  selectedEmployeesStatus: boolean
}
