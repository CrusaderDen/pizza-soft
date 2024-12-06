import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { fetchEmployeesThunk } from '@/app/app-slice'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { MainLayout } from '@/layouts/main-layout/main-layout'
import { Sidebar } from '@/layouts/sidebar/sidebar'
import { EmployeeInfoPage } from '@/pages/employees-info-page/employees-info-page'

import 'react-toastify/dist/ReactToastify.css'

function App() {
  const dispatch = useAppDispatch()
  const activeFilters = useAppSelector(state => state.employees.activeFilters)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    dispatch(fetchEmployeesThunk(searchParams.size ? { filters: searchParams.get('f') } : ''))
  }, [dispatch, activeFilters, searchParams])

  return (
    <>
      <Sidebar />
      <MainLayout>
        <EmployeeInfoPage />
        {/*<Outlet />*/}
      </MainLayout>
      <ToastContainer />
    </>
  )
}

export default App
