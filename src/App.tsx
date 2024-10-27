import { Outlet } from 'react-router-dom'

import { Sidebar } from '@/components/sidebar/sidebar'

import s from './App.module.scss'

function App() {
  return (
    <div className={s.appLayout}>
      {/*<EmployeesTable />*/}
      <Outlet />
      <Sidebar />
    </div>
  )
}

export default App
