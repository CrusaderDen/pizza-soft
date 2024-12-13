import { Employee } from '@/api/app-api.types'
import { EmployeeState, SortField, SortOrder } from '@/app/store/app-slice.types'
import {
  addEmployeeThunk,
  deleteEmployeeThunk,
  fetchEmployeesThunk,
  updateEmployeeThunk,
} from '@/app/store/app-thunks'
import { parseDate } from '@/utils/parse-date'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: EmployeeState = {
  activeFilters: [],
  activeSort: ['unselected', 'unselected'],
  employees: [],
  error: null,
  filteredEmployees: [],
  loading: false,
  selectedEmployeesRole: [],
  selectedEmployeesStatus: false,
  sortField: 'unselected',
  sortOrder: 'unselected',
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
        state.employees = [...action.payload].sort((a: Employee, b: Employee) =>
          a.role > b.role ? 1 : -1
        )
        state.filteredEmployees = [...state.employees]
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
    setSelectedFilter: (state, action) => {
      //payload = {action: add/remove/clear, filterValue: cook/waiter/driver/archive}
      if (action.payload.action === 'add') {
        state.activeFilters.push(action.payload.filterValue)
      }
      if (action.payload.action === 'replace') {
        state.activeFilters = action.payload.filterValue
      }
      if (action.payload.action === 'remove') {
        state.activeFilters = state.activeFilters.filter(
          filter => filter !== action.payload.filterValue
        )
      }
      if (action.payload.action === 'clear') {
        state.activeFilters.length = 0
      }
    },
    setSelectedSortField: (state, action: PayloadAction<SortField>) => {
      state.sortField = action.payload
    },
    setSelectedSortOrder: (state, action: PayloadAction<SortOrder>) => {
      state.sortOrder = action.payload
      state.filteredEmployees = [...state.filteredEmployees].sort((a: Employee, b: Employee) => {
        if (state.sortField === 'name') {
          if (state.sortOrder === 'asc') {
            return a.name < b.name ? 1 : -1
          } else if (state.sortOrder === 'desc') {
            return a.name > b.name ? 1 : -1
          } else if (state.sortOrder === 'unselected') {
            return a.role > b.role ? 1 : -1
          }
        }

        if (state.sortField === 'birthday') {
          if (state.sortOrder === 'asc') {
            return parseDate(a.birthday) - parseDate(b.birthday)
          } else if (state.sortOrder === 'desc') {
            return parseDate(b.birthday) - parseDate(a.birthday)
          } else if (state.sortOrder === 'unselected') {
            return a.role > b.role ? 1 : -1
          }
        }

        return 0
      })
    },
  },
})

export const { setEmployees, setSelectedFilter, setSelectedSortField, setSelectedSortOrder } =
  appSlice.actions

export default appSlice.reducer
