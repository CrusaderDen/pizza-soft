import { useEffect, useState } from 'react'

import { fetchData } from '@/app/app-api'
import { Employee, Role } from '@/app/app-api.types'
import { CardEmployee } from '@/components/card-employee/card-employee'
import { Sidebar } from '@/components/sidebar/sidebar'

import s from './App.module.scss'

function App() {
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([])
  const [statusChecked, setStatusChecked] = useState(false)
  const [sortByName, setSortByName] = useState<'asc' | 'default' | 'desc' | 'none'>('default')
  const [sortByDateOfBirthday, setSortByDateOfBirthday] = useState<
    'asc' | 'default' | 'desc' | 'none'
  >('none')
  const [data, setData] = useState<Employee[]>([])

  fetchData().then(res => {
    setData(res)
  })

  let employeesForRender = data

  if (selectedRoles.length) {
    employeesForRender = employeesForRender.filter(employee =>
      selectedRoles.includes(employee.role as Role)
    )
  }

  if (statusChecked) {
    employeesForRender = employeesForRender.filter(employee => employee.isArchive)
  }

  useEffect(() => {
    setSortByName('none')
  }, [sortByDateOfBirthday])

  useEffect(() => {
    setSortByDateOfBirthday('none')
  }, [sortByName])

  if (sortByName === 'asc') {
    employeesForRender = employeesForRender.sort((a, b) => (a.name < b.name ? -1 : 1))
  }

  if (sortByName === 'desc') {
    employeesForRender = employeesForRender.sort((a, b) => (a.name > b.name ? -1 : 1))
  }

  if (sortByDateOfBirthday === 'asc') {
    employeesForRender = employeesForRender.sort(
      (a, b) => parseDate(a.birthday) - parseDate(b.birthday)
    )
  }

  if (sortByDateOfBirthday === 'desc') {
    employeesForRender = employeesForRender.sort(
      (a, b) => parseDate(b.birthday) - parseDate(a.birthday)
    )
  }

  if (sortByName === 'default') {
    employeesForRender
      .sort((a, b) => (a.name < b.name ? -1 : 1))
      .sort((a, b) => (a.role < b.role ? -1 : 1))
  }

  function parseDate(dateString: string): number {
    const [day, month, year] = dateString.split('.').map(Number)

    return new Date(year, month - 1, day).getTime()
  }

  const renderedEmployees = employeesForRender.map((employee: Employee) => (
    <CardEmployee employee={employee} key={employee.id} />
  ))

  return (
    <div className={s.appLayout}>
      {!!employeesForRender.length && <div className={s.employeeTable}> {renderedEmployees}</div>}
      <Sidebar
        selectedRoles={selectedRoles}
        setSelectedRoles={setSelectedRoles}
        setSortByDateOfBirthday={setSortByDateOfBirthday}
        setSortByName={setSortByName}
        setStatusChecked={setStatusChecked}
      />
    </div>
  )
}

export default App
