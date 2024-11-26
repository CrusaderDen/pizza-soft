import { Provider } from 'react-redux'
import { MemoryRouter, Navigate, Route, Routes } from 'react-router-dom'

import App from '@/app/App'
import employeesReducer from '@/app/app-slice'
import { PATHS } from '@/common/paths'
import { CreateEmployeePage } from '@/pages/create-employee-page/create-employee-page'
import { EmployeeInfoPage } from '@/pages/employees-info-page/employees-info-page'
import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import '@testing-library/jest-dom'

const store = configureStore({
  reducer: employeesReducer,
})

describe('Router', () => {
  it('should navigate to the create employee page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[PATHS.CREATE_EMPLOYEE]}>
          <Routes>
            <Route element={<App />} path={'/'}>
              <Route element={<CreateEmployeePage />} path={PATHS.CREATE_EMPLOYEE} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    )

    // Проверим, что компонент CreateEmployeePage отображается
    expect(
      screen.getByText(/Уникальный текст для прохождения тестов на рендер CreateEmployeePage/i)
    ).toBeInTheDocument()
  })

  it('should navigate to the employee info page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[PATHS.TABLE]}>
          <Routes>
            <Route element={<App />} path={'/'}>
              <Route element={<EmployeeInfoPage />} path={PATHS.TABLE} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    )

    // Проверим, что компонент EmployeeInfoPage отображается
    expect(
      screen.getByText(/Уникальный текст для прохождения тестов на рендер EmployeeInfoPage/i)
    ).toBeInTheDocument()
  })

  it('should redirect to the table page on root path', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route element={<App />} path={'/'}>
              <Route element={<Navigate to={PATHS.TABLE} />} path={'/'} />
              <Route element={<EmployeeInfoPage />} path={PATHS.TABLE} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    )

    // Проверим, что происходит редирект на таблицу сотрудников
    expect(
      screen.getByText(/Уникальный текст для прохождения тестов на рендер EmployeeInfoPage/i)
    ).toBeInTheDocument()
  })

  it('should redirect to the table page for unknown paths', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/unknown-path']}>
          <Routes>
            <Route element={<App />} path={'/'}>
              <Route element={<Navigate to={PATHS.TABLE} />} path={'*'} />
              <Route element={<EmployeeInfoPage />} path={PATHS.TABLE} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    )

    // Проверим, что происходит редирект на таблицу сотрудников
    expect(
      screen.getByText(/Уникальный текст для прохождения тестов на рендер EmployeeInfoPage/i)
    ).toBeInTheDocument()
  })
})
