import { Employee } from '@/api/app-api.types'
import dataFromBackend from '@/api/mock-backend/employees.json'

export const fetchEmployeesData = () => {
  return new Promise<Employee[]>(res => {
    setTimeout(() => {
      res(dataFromBackend as Employee[])
    }, 1500)
  })
}
