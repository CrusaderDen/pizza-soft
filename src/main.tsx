import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

import App from '@/App'
import { PATHS } from '@/app/paths'
import { store } from '@/app/store'
import { CreateEmployee } from '@/components/create-employee/create-employee'
import { EmployeesTable } from '@/components/employees-table/employees-table'
import { createRoot } from 'react-dom/client'

import './index.css'

const router = createBrowserRouter([
  {
    children: [
      {
        element: <Navigate to={PATHS.TABLE} />,
        path: '/',
      },
      {
        element: <CreateEmployee />,
        path: PATHS.CREATE_EMPLOYEE,
      },
      {
        element: <EmployeesTable />,
        path: PATHS.TABLE,
      },
    ],
    element: <App />,
    path: '/',
  },

  {
    element: <Navigate to={PATHS.TABLE} />,
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
