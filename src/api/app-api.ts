import { Employee } from '@/api/app-api.types'
import dataFromBackend from '@/backend/employees.json'

export const fetchEmployeesData = (query: any) => {
  return new Promise<Employee[]>(res => {
    setTimeout(() => {
      const data: Employee[] = dataFromBackend

      if (!query) {
        return res(data)
      } else {
        let activeFilters = query.filters

        activeFilters = activeFilters.replace('waiter', 'официант')
        activeFilters = activeFilters.replace('cook', 'повар')
        activeFilters = activeFilters.replace('driver', 'водитель')

        const activeFiltersArr = activeFilters.split(',')

        const filteredData = data.filter(employee => {
          const term_1 = activeFiltersArr.includes(employee.role)
          const term_2 = activeFiltersArr.includes('archived') && employee.isArchive

          return term_1 || term_2
        })

        return res(filteredData)
      }
    }, 0)
  })
}
