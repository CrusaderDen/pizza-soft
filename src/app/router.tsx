import { createBrowserRouter } from 'react-router-dom'

import App from '@/app/App'
import { PATHS } from '@/common/paths'
import { EmployeeCreatePage } from '@/pages/create-employee-page/employee-create-page'
import { EmployeesTablePage } from '@/pages/employees-info-page/employees-info-page'

export const router = createBrowserRouter([
  {
    children: [
      {
        element: <EmployeesTablePage />,
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
