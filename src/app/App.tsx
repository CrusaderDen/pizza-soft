import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { MainLayout } from '@/app/layouts/main-layout/main-layout'

import 'react-toastify/dist/ReactToastify.css'
import 'nprogress/nprogress.css'
import './../nprogress.scss'

function App() {
  return (
    <MainLayout>
      <Outlet />
      <ToastContainer />
    </MainLayout>
  )
}

export default App
