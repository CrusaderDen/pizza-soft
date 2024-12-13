import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { MainLayout } from '@/app/layouts/main-layout/main-layout'
import { useAppSelector } from '@/app/store/store'
import nProgress from 'nprogress'

import 'react-toastify/dist/ReactToastify.css'
import 'nprogress/nprogress.css'
import './../nprogress.scss'

nProgress.configure({ showSpinner: false, trickle: false })

function App() {
  const isLoading = useAppSelector(state => state.employees.loading)

  useEffect(() => {
    if (isLoading) {
      nProgress.start()
    } else {
      nProgress.done()
    }
  }, [isLoading])

  return (
    <MainLayout>
      <Outlet />
      <ToastContainer />
    </MainLayout>
  )
}

export default App
