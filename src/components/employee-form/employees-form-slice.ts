import { fetchData } from '@/api/app-api'
import { Employee, Role } from '@/api/app-api.types'
import { createAppAsyncThunk } from '@/app/withTypes'
import { createSlice } from '@reduxjs/toolkit'

type EmployeeState = {
  employees: Employee[]
  error: null | string
  loading: boolean
  selectedEmployeesRole: Role[]
  selectedEmployeesStatus: boolean
}

const initialState: EmployeeState = {
  employees: [],
  error: null,
  loading: false,
  selectedEmployeesRole: [],
  selectedEmployeesStatus: false,
}

//получаем сотрудников, здесь был бы GET-запрос
export const fetchEmployees = createAppAsyncThunk('employees/fetchEmployees', async () => {
  const response = await fetchData()

  return response
})

//Создаем нового сотрудника, здесь был бы POST-запрос
export const addEmployee = createAppAsyncThunk(
  'employees/addEmployee',
  async (newEmployee: Omit<Employee, 'id'>) => {
    return newEmployee
  }
)

//Редактирование данных сотрудника, здесь был бы PUT-запрос
export const updateEmployee = createAppAsyncThunk(
  'employees/updateEmployee',
  async (updatedEmployee: Employee) => {
    return updatedEmployee
  }
)

//Редактирование данных сотрудника, здесь был бы DELETE-запрос
export const deleteEmployee = createAppAsyncThunk(
  'employees/deleteEmployee',
  async (id: number) => {
    return id
  }
)

export const employeesFormSlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(fetchEmployees.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false
        state.employees = action.payload
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch employees'
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push({
          ...action.payload,
          id: state.employees.length + 1,
        })
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(employee => employee.id === action.payload.id)

        if (index !== -1) {
          state.employees[index] = action.payload
        }
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(employee => employee.id === action.payload)

        if (index !== -1) {
          state.employees.splice(index, 1)
        }
      })
  },
  initialState,
  name: 'employees',
  reducers: {
    employeesForRender: (state, action) => {
      state.employees = action.payload
    },
    setSelectedEmployeesRole: (state, action) => {
      state.selectedEmployeesRole = action.payload
    },
    setSelectedEmployeesStatus: (state, action) => {
      state.selectedEmployeesStatus = action.payload
    },
  },
})
export const { employeesForRender, setSelectedEmployeesRole, setSelectedEmployeesStatus } =
  employeesFormSlice.actions

export default employeesFormSlice.reducer