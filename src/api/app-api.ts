import { getEmployeesData } from '@/backend/employees-endpoint'

export const api = {
  async fetchEmployeesData(query: any) {
    return await getEmployeesData(query)
  },
}
