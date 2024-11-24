import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import { router } from '@/app/router'
import { store } from '@/app/store'
import { createRoot } from 'react-dom/client'

import './index.css'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </StrictMode>
)
