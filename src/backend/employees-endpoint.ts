import { Employee } from '@/api/app-api.types'
import { parseDate } from '@/utils/parse-date'

import dataFromBD from './employees-db.json'

export const getEmployeesData = (query: any) => {
  const delay = Math.random() * 300

  return new Promise<Employee[]>(res => {
    setTimeout(() => {
      const data: Employee[] = dataFromBD.sort((a: Employee, b: Employee) =>
        a.role > b.role ? 1 : -1
      )

      if (!query) {
        return res(data)
      } else {
        let activeFilters = query.filters
        const activeSort = query.sort
        let resultEmployees: Employee[] = data

        if (activeFilters) {
          activeFilters = activeFilters.replace('waiter', 'официант')
          activeFilters = activeFilters.replace('cook', 'повар')
          activeFilters = activeFilters.replace('driver', 'водитель')

          const activeFiltersArr = activeFilters.split(',')
          const rolesToCheck = ['официант', 'повар', 'водитель']
          const isFilterByRole = rolesToCheck.some(role => activeFiltersArr.includes(role))
          const isFilterByArchived = activeFiltersArr.includes('archived')

          const filteredData = resultEmployees.filter(employee => {
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

          resultEmployees = filteredData
        }
        if (activeSort) {
          const sortField = activeSort.split(',')[0]
          const sortOrder = activeSort.split(',')[1]
          const sortedData = [...resultEmployees].sort((a: Employee, b: Employee) => {
            if (sortField === 'name') {
              if (sortOrder === 'asc') {
                return a.name < b.name ? 1 : -1
              } else if (sortOrder === 'desc') {
                return a.name > b.name ? 1 : -1
              }
            }

            if (sortField === 'birthday') {
              if (sortOrder === 'asc') {
                return parseDate(a.birthday) - parseDate(b.birthday)
              } else if (sortOrder === 'desc') {
                return parseDate(b.birthday) - parseDate(a.birthday)
              }
            }

            return 0
          })

          resultEmployees = sortedData
        }
        res(resultEmployees)
      }
    }, delay)
  })
}
