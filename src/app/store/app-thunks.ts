//получаем сотрудников, здесь был бы GET-запрос
import { api } from '@/api/app-api'
import { Employee } from '@/api/app-api.types'
import { createAppAsyncThunk } from '@/app/store/app-slice.types'

export const fetchEmployeesThunk = createAppAsyncThunk(
  'employees/fetchEmployeesThunk',
  async (query: any) => {
    return await api.fetchEmployeesData(query)
  }
)
//Создаем нового сотрудника, здесь был бы POST-запрос
export const addEmployeeThunk = createAppAsyncThunk(
  'employees/addEmployee',
  async (newEmployee: Omit<Employee, 'id'>) => {
    await new Promise(resolve => setTimeout(resolve, 300))

    return newEmployee
  }
)
//Редактирование данных сотрудника, здесь был бы PUT-запрос
export const updateEmployeeThunk = createAppAsyncThunk(
  'employees/updateEmployee',
  async (updatedEmployee: Employee) => {
    await new Promise(resolve => setTimeout(resolve, 1000))

    return updatedEmployee
  }
)
//Редактирование данных сотрудника, здесь был бы DELETE-запрос
export const deleteEmployeeThunk = createAppAsyncThunk(
  'employees/deleteEmployee',
  async (id: number) => {
    await new Promise(resolve => setTimeout(resolve, 1000))

    return id
  }
)
