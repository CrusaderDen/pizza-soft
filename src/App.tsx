import { useState } from 'react'

import { fetchData } from '@/app/app-api'
import { Employee, Role } from '@/app/app-api.types'
import { CardEmployee } from '@/components/card-employee/card-employee'
import { Sidebar } from '@/components/sidebar/sidebar'

import s from './App.module.scss'

function App() {
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([])
  const [statusChecked, setStatusChecked] = useState(false)
  const [sortByName, setSortByName] = useState<'asc' | 'default' | 'desc'>('default')
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

  if (sortByName === 'asc') {
    employeesForRender = employeesForRender.sort((a, b) => (a.name < b.name ? -1 : 1))
  }

  if (sortByName === 'desc') {
    employeesForRender = employeesForRender.sort((a, b) => (a.name > b.name ? -1 : 1))
  }

  if (sortByName === 'default') {
    employeesForRender
      .sort((a, b) => (a.name < b.name ? -1 : 1))
      .sort((a, b) => (a.role < b.role ? -1 : 1))
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
        setSortBy={setSortByName}
        setStatusChecked={setStatusChecked}
      />
    </div>
  )
}

export default App
