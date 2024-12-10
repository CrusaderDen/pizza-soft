import { useEffect } from 'react'
import { Outlet, useSearchParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { MainLayout } from '@/app/layouts/main-layout/main-layout'
import { applyFilters, fetchEmployeesThunk } from '@/app/store/app-slice'
import { useAppDispatch, useAppSelector } from '@/app/store/store'

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
      const activeSortArr = searchParams.get('sort')?.split(',')

      console.log(activeSortArr)
      dispatch(applyFilters({ action: 'replace', filterValue: activeFiltersArr }))
    }
    dispatch(fetchEmployeesThunk(searchParams.size ? { filters: searchParams.get('f') } : ''))
  }, [dispatch, activeFilters, searchParams])

  return (
    <MainLayout>
      <Outlet />
      <ToastContainer />
    </MainLayout>
  )
}

export default App
