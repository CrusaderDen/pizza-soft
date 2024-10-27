import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { Sidebar } from '@/components/sidebar/sidebar'

import 'react-toastify/dist/ReactToastify.css'

import s from './App.module.scss'

function App() {
  return (
    <div className={s.appLayout}>
      {/*<EmployeesTable />*/}
      <Outlet />
      <Sidebar />
      <ToastContainer />
    </div>
  )
}

export default App
