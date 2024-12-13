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
  activeFilters: string[]
  activeSort: [SortField, SortOrder]
  employees: Employee[]
  error: null | string
  filteredEmployees: Employee[]
  loading: boolean
  selectedEmployeesRole: Role[]
  selectedEmployeesStatus: boolean
  sortField: SortField
  sortOrder: SortOrder
}
