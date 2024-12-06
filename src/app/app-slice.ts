import { fetchEmployeesData } from '@/api/app-api'
import { Employee, Role } from '@/api/app-api.types'
import { createAppAsyncThunk } from '@/app/withTypes'
import { createSlice } from '@reduxjs/toolkit'

type EmployeeState = {
  activeFilters: string[]
  employees: Employee[]
  error: null | string
  filteredEmployees: Employee[]
  loading: boolean
  selectedEmployeesRole: Role[]
  selectedEmployeesStatus: boolean
}

const initialState: EmployeeState = {
  activeFilters: [],
  employees: [],
  error: null,
  filteredEmployees: [],
  loading: false,
  selectedEmployeesRole: [],
  selectedEmployeesStatus: false,
}

export const appSlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(fetchEmployees.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false
        state.employees = action.payload
        state.filteredEmployees = action.payload
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
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
      //{type: add/remove/clear, filterValue: cook/waiter/driver/archive}
      if (action.payload.type === 'add') {
        state.activeFilters.push(action.payload.filterValue)
      }
      if (action.payload.type === 'remove') {
        state.activeFilters = state.activeFilters.filter(
          filter => filter !== action.payload.filterValue
        )
      }
      if (action.payload.type === 'clear') {
        state.activeFilters.length = 0
      }
      // state.filteredEmployees = state.employees.filter(employee =>
      //   state.activeFilters.includes(employee.role)
      // )
    },
    setEmployees: (state, action) => {
      state.employees = action.payload
    },
  },
})

//получаем сотрудников, здесь был бы GET-запрос
export const fetchEmployees = createAppAsyncThunk('employees/fetchEmployees', async () => {
  if (!sessionStorage.getItem('employeesList')) {
    const response = await fetchEmployeesData()

    sessionStorage.setItem('employeesList', JSON.stringify(response))
  }

  return JSON.parse(sessionStorage.getItem('employeesList') || '')
})

//Создаем нового сотрудника, здесь был бы POST-запрос
export const addEmployee = createAppAsyncThunk(
  'employees/addEmployee',
  async (newEmployee: Omit<Employee, 'id'>) => {
    await new Promise(resolve => setTimeout(resolve, 1000))

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

export const { applyFilters, setEmployees } = appSlice.actions

export default appSlice.reducer
