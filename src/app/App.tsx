import { useEffect } from 'react'
import { Outlet, useSearchParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { applyFilters, fetchEmployeesThunk } from '@/app/app-slice'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { MainLayout } from '@/layouts/main-layout/main-layout'
import { Sidebar } from '@/layouts/sidebar/sidebar'

import 'react-toastify/dist/ReactToastify.css'

let firstRenderFlag = true

function App() {
  const dispatch = useAppDispatch()
  const activeFilters = useAppSelector(state => state.employees.activeFilters)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (firstRenderFlag && searchParams.size) {
      firstRenderFlag = false
      const activeFiltersArr = searchParams.get('f')?.split(',')

      dispatch(applyFilters({ action: 'replace', filterValue: activeFiltersArr }))
    }
    dispatch(fetchEmployeesThunk(searchParams.size ? { filters: searchParams.get('f') } : ''))
  }, [dispatch, activeFilters, searchParams])

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
