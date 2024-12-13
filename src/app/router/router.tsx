import { Navigate, createBrowserRouter } from 'react-router-dom'

import App from '@/app/App'
import { EmployeeCreatePage } from '@/app/pages/create-employee-page/employee-create-page'
import { EmployeesTablePage } from '@/app/pages/employees-info-page/employees-info-page'
import { PATHS } from '@/app/router/paths'

export const router = createBrowserRouter([
  {
    children: [
      {
        element: <Navigate to={PATHS.TABLE} />,
        path: '/',
      },
      {
        element: <EmployeeCreatePage />,
        path: PATHS.CREATE_EMPLOYEE,
      },
      {
        element: <EmployeesTablePage />,
        path: PATHS.TABLE,
      },
    ],
    element: <App />,
    path: '/',
  },
])
