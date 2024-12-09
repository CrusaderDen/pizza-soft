import { api } from '@/api/app-api'
import { Employee, Role } from '@/api/app-api.types'
import { AppDispatch, RootState } from '@/app/store/store'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export type SortOrder = 'asc' | 'desc' | 'unselected'
export type SortField = 'birthday' | 'name' | 'unselected'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  dispatch: AppDispatch
  state: RootState
}>()

type EmployeeState = {
  activeFilters: string[]
  employees: Employee[]
  error: null | string
  filteredEmployees: Employee[]
  loading: boolean
  selectedEmployeesRole: Role[]
  selectedEmployeesStatus: boolean
  sortField: SortField
  sortOrder: SortOrder
}

const initialState: EmployeeState = {
  activeFilters: [],
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
        // state.loading = true
        state.error = null
      })
      .addCase(fetchEmployeesThunk.fulfilled, (state, action) => {
        state.loading = false
        state.employees = [...action.payload].sort((a: Employee, b: Employee) => {
          return a.role > b.role ? 1 : -1
        })
        state.filteredEmployees = state.employees
      })
      .addCase(fetchEmployeesThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch employees'
      })
      .addCase(addEmployee.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false
        const newEmployee = {
          ...action.payload,
          id: Date.now(),
        }

        state.employees.push(newEmployee)
        sessionStorage.setItem('employeesList', JSON.stringify(state.employees))
      })
      .addCase(updateEmployee.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false
        const index = state.employees.findIndex(employee => employee.id === action.payload.id)

        if (index !== -1) {
          state.employees[index] = action.payload
          sessionStorage.setItem('employeesList', JSON.stringify(state.employees))
        }
      })
      .addCase(deleteEmployee.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
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
    applyFilters: (state, action) => {
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

    applySortField: (state, action: PayloadAction<SortField>) => {
      state.sortField = action.payload
    },
    applySortOrder: (state, action: PayloadAction<SortOrder>) => {
      state.sortOrder = action.payload
    },
    setEmployees: (state, action) => {
      state.employees = action.payload
    },
  },
})

//получаем сотрудников, здесь был бы GET-запрос
export const fetchEmployeesThunk = createAppAsyncThunk(
  'employees/fetchEmployeesThunk',
  async (query: any) => {
    const response = await api.fetchEmployeesData(query)

    return response
  }
)

//Создаем нового сотрудника, здесь был бы POST-запрос
export const addEmployee = createAppAsyncThunk(
  'employees/addEmployee',
  async (newEmployee: Omit<Employee, 'id'>) => {
    await new Promise(resolve => setTimeout(resolve, 300))

    return newEmployee
  }
)

//Редактирование данных сотрудника, здесь был бы PUT-запрос
export const updateEmployee = createAppAsyncThunk(
  'employees/updateEmployee',
  async (updatedEmployee: Employee) => {
    await new Promise(resolve => setTimeout(resolve, 1000))

    return updatedEmployee
  }
)

//Редактирование данных сотрудника, здесь был бы DELETE-запрос
export const deleteEmployee = createAppAsyncThunk(
  'employees/deleteEmployee',
  async (id: number) => {
    await new Promise(resolve => setTimeout(resolve, 1000))

    return id
  }
)

export const { applyFilters, applySortField, applySortOrder, setEmployees } = appSlice.actions

export default appSlice.reducer
