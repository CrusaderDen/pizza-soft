import { Navigate, createBrowserRouter } from 'react-router-dom'

import App from '@/app/App'
import { PATHS } from '@/common/paths'
import { CreateEmployeePage } from '@/pages/create-employee-page/create-employee-page'
import { EmployeeInfoPage } from '@/pages/employees-info-page/employees-info-page'

export const router = createBrowserRouter([
  {
    children: [
      {
        element: <Navigate to={PATHS.TABLE} />,
        path: '/',
      },
      {
        element: <CreateEmployeePage />,
        path: PATHS.CREATE_EMPLOYEE,
      },
      {
        element: <EmployeeInfoPage />,
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
