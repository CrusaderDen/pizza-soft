import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import App from '@/App'
import { store } from '@/app/store'
import { createRoot } from 'react-dom/client'

import './index.css'

const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
