import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

import App from '@/App'
import { store } from '@/app/store'
import { CreateEmployee } from '@/components/create-employee/create-employee'
import { createRoot } from 'react-dom/client'

import './index.css'

const router = createBrowserRouter([
  {
    element: <App />,
    path: '/employees',
  },
  {
    element: <CreateEmployee />,
    path: '/create-employee',
  },
  {
    element: <Navigate to={'/employees'} />, // Перенаправление на /employees для всех остальных путей
    path: '*',
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
