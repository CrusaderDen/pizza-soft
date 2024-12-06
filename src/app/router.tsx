import { Navigate, createBrowserRouter, useLocation } from 'react-router-dom'

import App from '@/app/App'
import { PATHS } from '@/common/paths'
import { CreateEmployeePage } from '@/pages/create-employee-page/create-employee-page'
import { EmployeeInfoPage } from '@/pages/employees-info-page/employees-info-page'

const RedirectWithQuery = () => {
  const location = useLocation()

  console.log(location)

  return <Navigate to={`${PATHS.TABLE}${location.search}`} />
}

export const router = createBrowserRouter([
  {
    children: [
      {
        element: <RedirectWithQuery />,
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
])
