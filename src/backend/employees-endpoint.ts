import { Employee } from '@/api/app-api.types'

import dataFromBD from './employees-db.json'

export const getEmployeesData = (query: any) => {
  const delay = Math.random() * 500

  return new Promise<Employee[]>(res => {
    setTimeout(() => {
      const data: Employee[] = dataFromBD

      if (!query) {
        return res(data)
      } else {
        let activeFilters = query.filters

        activeFilters = activeFilters.replace('waiter', 'официант')
        activeFilters = activeFilters.replace('cook', 'повар')
        activeFilters = activeFilters.replace('driver', 'водитель')

        const activeFiltersArr = activeFilters.split(',')
        const rolesToCheck = ['официант', 'повар', 'водитель']
        const isFilterByRole = rolesToCheck.some(role => activeFiltersArr.includes(role))
        const isFilterByArchived = activeFiltersArr.includes('archived')

        const filteredData = data.filter(employee => {
          if (activeFiltersArr.length === 0) {
            return true
          }

          const isRoleMatched = activeFiltersArr.includes(employee.role)
          const isArchivedMatched = employee.isArchive

          if (isFilterByRole && isFilterByArchived) {
            return isRoleMatched && isArchivedMatched
          } else if (isFilterByRole) {
            return isRoleMatched
          } else if (isFilterByArchived) {
            return isArchivedMatched
          }
        })

        return res(filteredData)
      }
    }, delay)
  })
}

//Math.random() * 1000
