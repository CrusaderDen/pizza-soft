import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { MainLayout } from '@/layouts/main-layout/main-layout'
import { Sidebar } from '@/layouts/sidebar/sidebar'

import 'react-toastify/dist/ReactToastify.css'

function App() {
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
