import { useState } from 'react'

import { Employee, Employees } from 'backend-data/employees-types'
import { CardEmployee } from 'components/card-employee/card-employee'
import { Sidebar } from 'components/sidebar/sidebar'

import s from './App.module.scss'

import serverData from './backend-data/employees.json'

export type Roles = 'cook' | 'driver' | 'waiter'

const sortedData = serverData.sort((a, b) => (a.role > b.role ? -1 : 1))

function App() {
  const [selectedRoles, setSelectedRoles] = useState<Roles[]>([])
  const [statusChecked, setStatusChecked] = useState(false)

  const employees: Employees = sortedData

  const filteredEmployees = selectedRoles.length
    ? employees.filter(employee => selectedRoles.includes(employee.role as Roles))
    : employees

  const filterWithStatus = statusChecked
    ? filteredEmployees.filter(employee => employee.isArchive)
    : filteredEmployees

  return (
    <div className={s.appLayout}>
      <div className={s.employeeTable}>
        {filterWithStatus.map((employee: Employee) => (
          <CardEmployee employee={employee} key={employee.id} />
        ))}
      </div>
      <Sidebar
        selectedRoles={selectedRoles}
        setSelectedRoles={setSelectedRoles}
        setStatusChecked={setStatusChecked}
      />
    </div>
  )
}

export default App
