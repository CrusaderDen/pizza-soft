import { useEffect, useState } from 'react'

import { Role } from '@/app/app-api.types'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { EmployeesTable } from '@/components/employees-table/employees-table'
import { fetchEmployees } from '@/components/employees-table/employeesSlice'
import { Loader } from '@/components/loader/loader'
import { Sidebar } from '@/components/sidebar/sidebar'

import s from './App.module.scss'

export type SortVariant =
  | 'by-date-of-birthday-asc'
  | 'by-date-of-birthday-desc'
  | 'by-name-asc'
  | 'by-name-desc'
  | 'default'

function App() {
  const dispatch = useAppDispatch()
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([])
  const [statusChecked, setStatusChecked] = useState(false)
  const [sortBy, setSortBy] = useState<SortVariant>('default')

  const { employees, error, loading } = useAppSelector(state => state.employees)

  useEffect(() => {
    dispatch(fetchEmployees())
  }, [dispatch])

  if (error) {
    return <div>Error: {error}</div>
  }

  let employeesForRender = [...employees]

  if (selectedRoles.length) {
    employeesForRender = employeesForRender.filter(employee =>
      selectedRoles.includes(employee.role as Role)
    )
  }

  if (statusChecked) {
    employeesForRender = employeesForRender.filter(employee => employee.isArchive)
  }

  if (sortBy === 'by-name-asc') {
    employeesForRender = employeesForRender.sort((a, b) => (a.name < b.name ? -1 : 1))
  }

  if (sortBy === 'by-name-desc') {
    employeesForRender = employeesForRender.sort((a, b) => (a.name > b.name ? -1 : 1))
  }

  if (sortBy === 'by-date-of-birthday-asc') {
    employeesForRender = employeesForRender.sort(
      (a, b) => parseDate(a.birthday) - parseDate(b.birthday)
    )
  }

  if (sortBy === 'by-date-of-birthday-desc') {
    employeesForRender = employeesForRender.sort(
      (a, b) => parseDate(b.birthday) - parseDate(a.birthday)
    )
  }

  if (sortBy === 'default') {
    employeesForRender.sort((a, b) => a.id - b.id)
  }

  function parseDate(dateString: string): number {
    const [day, month, year] = dateString.split('.').map(Number)

    return new Date(year, month - 1, day).getTime()
  }

  return (
    <div className={s.appLayout}>
      {loading && <Loader />}
      {!!employeesForRender.length && (
        <EmployeesTable employees={employeesForRender} setSortBy={setSortBy} />
      )}
      <Sidebar
        selectedRoles={selectedRoles}
        setSelectedRoles={setSelectedRoles}
        setStatusChecked={setStatusChecked}
      />
    </div>
  )
}

export default App
