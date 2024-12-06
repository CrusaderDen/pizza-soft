import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { fetchEmployees } from '@/app/app-slice'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { MainLayout } from '@/layouts/main-layout/main-layout'
import { Sidebar } from '@/layouts/sidebar/sidebar'

import 'react-toastify/dist/ReactToastify.css'

function App() {
  const dispatch = useAppDispatch()
  const employees = useAppSelector(state => state.employees.employees)

  useEffect(() => {
    if (employees && employees.length === 0) {
      dispatch(fetchEmployees())
    }
  }, [dispatch])

  return (
    <>
      <Sidebar />
      <MainLayout>
        <Outlet />
      </MainLayout>
      <ToastContainer />
    </>
  )
}

export default App
