import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

import App from '@/App'
import { store } from '@/app/store'
import { CreateEmployee } from '@/components/create-employee/create-employee'
import { EmployeesTable } from '@/components/employees-table/employees-table'
import { createRoot } from 'react-dom/client'

import './index.css'

const router = createBrowserRouter([
  {
    children: [
      {
        element: <CreateEmployee />,
        path: '/create-employee',
      },
      {
        element: <EmployeesTable />,
        path: '/employees-table',
      },
    ],
    element: <App />,
    path: '/',
  },

  {
    element: <Navigate to={'/employees'} />,
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
