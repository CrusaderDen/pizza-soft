import { Employee } from '@/app/app-api.types'

import dataFromBackend from './../mock-backend/employees.json'

export const fetchData = () => {
  return new Promise<Employee[]>(res => {
    setTimeout(() => {
      res(dataFromBackend as Employee[])
    }, 1500)
  })
}
