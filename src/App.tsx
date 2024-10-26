import { useState } from 'react'

import { Role } from '@/app/app-api.types'
import { EmployeesTable } from '@/components/employees-table/employees-table'
import { Sidebar } from '@/components/sidebar/sidebar'

import s from './App.module.scss'

function App() {
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([])
  const [statusChecked, setStatusChecked] = useState(false)

  // if (selectedRoles.length) {
  //   const filtered = employees.filter(employee => selectedRoles.includes(employee.role as Role))
  //
  //   dispatch(employeesForRender(filtered))
  // }
  //
  // if (statusChecked) {
  //   const filtered = employees.filter(employee => employee.isArchive)
  //
  //   dispatch(employeesForRender(filtered))
  // }

  return (
    <div className={s.appLayout}>
      <EmployeesTable />
      {/*<Outlet />*/}
      <Sidebar
        selectedRoles={selectedRoles}
        setSelectedRoles={setSelectedRoles}
        setStatusChecked={setStatusChecked}
      />
    </div>
  )
}

export default App
