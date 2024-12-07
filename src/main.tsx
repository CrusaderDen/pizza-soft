import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import { router } from '@/app/router/router'
import { store } from '@/app/store/store'
import { createRoot } from 'react-dom/client'

import './main.css'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
