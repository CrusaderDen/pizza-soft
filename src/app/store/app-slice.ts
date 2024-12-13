import { EmployeeState } from '@/app/store/app-slice.types'
import {
  addEmployeeThunk,
  deleteEmployeeThunk,
  fetchEmployeesThunk,
  updateEmployeeThunk,
} from '@/app/store/app-thunks'
import { createSlice } from '@reduxjs/toolkit'

const initialState: EmployeeState = {
  employees: [],
  error: null,
  loading: false,
  selectedEmployeesRole: [],
  selectedEmployeesStatus: false,
}

export const appSlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(fetchEmployeesThunk.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEmployeesThunk.fulfilled, (state, action) => {
        state.loading = false
        state.employees = [...action.payload]
      })
      .addCase(fetchEmployeesThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch employees'
      })
      .addCase(addEmployeeThunk.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(addEmployeeThunk.fulfilled, (state, action) => {
        state.loading = false
        const newEmployee = {
          ...action.payload,
          id: Date.now(),
        }

        state.employees.push(newEmployee)
        sessionStorage.setItem('employeesList', JSON.stringify(state.employees))
      })
      .addCase(updateEmployeeThunk.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(updateEmployeeThunk.fulfilled, (state, action) => {
        state.loading = false
        const index = state.employees.findIndex(employee => employee.id === action.payload.id)

        if (index !== -1) {
          state.employees[index] = action.payload
          sessionStorage.setItem('employeesList', JSON.stringify(state.employees))
        }
      })
      .addCase(deleteEmployeeThunk.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteEmployeeThunk.fulfilled, (state, action) => {
        state.loading = false
        const index = state.employees.findIndex(employee => employee.id === action.payload)

        if (index !== -1) {
          state.employees.splice(index, 1)
          sessionStorage.setItem('employeesList', JSON.stringify(state.employees))
        }
      })
  },
  initialState,
  name: 'appSlice',
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload
    },
  },
})

export const { setEmployees } = appSlice.actions

export default appSlice.reducer
