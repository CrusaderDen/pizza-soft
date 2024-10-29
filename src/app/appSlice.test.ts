import { Role } from '@/api/app-api.types'
import { describe, expect, it } from 'vitest'

import reducer, {
  addEmployee,
  deleteEmployee,
  employeesForRender,
  fetchEmployees,
  setSelectedEmployeesRole,
  setSelectedEmployeesStatus,
  updateEmployee,
} from './app-slice'

describe('app-slice', () => {
  const initialState = {
    employees: [],
    error: null,
    loading: false,
    selectedEmployeesRole: [],
    selectedEmployeesStatus: false,
  }

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle fetchEmployees.pending', () => {
    const action = { type: fetchEmployees.pending.type }
    const state = reducer(initialState, action)

    expect(state.loading).toBe(true)
    expect(state.error).toBe(null)
  })

  it('should handle fetchEmployees.fulfilled', () => {
    const action = { payload: [{ id: 1, name: 'John Doe' }], type: fetchEmployees.fulfilled.type }
    const state = reducer(initialState, action)

    expect(state.loading).toBe(false)
    expect(state.employees).toEqual(action.payload)
  })

  it('should handle fetchEmployees.rejected', () => {
    const action = { error: { message: 'Error fetching' }, type: fetchEmployees.rejected.type }
    const state = reducer(initialState, action)

    expect(state.loading).toBe(false)
    expect(state.error).toBe('Error fetching')
  })

  it('should handle addEmployee.fulfilled', () => {
    const newEmployee = { name: 'Jane Doe' }
    const action = { payload: newEmployee, type: addEmployee.fulfilled.type }
    const state = reducer(initialState, action)

    expect(state.employees).toHaveLength(1)
    expect(state.employees[0]).toMatchObject(newEmployee)
  })

  it('should handle updateEmployee.fulfilled', () => {
    const initialStateWithEmployees = {
      ...initialState,
      employees: [
        {
          birthday: '12.02.1982',
          id: 1,
          isArchive: false,
          name: 'Илья Емельянов',
          phone: '+7 (883) 508-3269',
          role: 'driver' as Role,
        },
      ],
    }
    const updatedEmployee = {
      birthday: '12.02.1982',
      id: 1,
      isArchive: false,
      name: 'Илья Емельянов',
      phone: '+7 (883) 508-3269',
      role: 'cook',
    }
    const action = { payload: updatedEmployee, type: updateEmployee.fulfilled.type }
    const state = reducer(initialStateWithEmployees, action)

    expect(state.employees[0]).toMatchObject(updatedEmployee)
  })

  it('should handle deleteEmployee.fulfilled', () => {
    const initialStateWithEmployees = {
      ...initialState,
      employees: [
        {
          birthday: '12.02.1982',
          id: 1,
          isArchive: false,
          name: 'Илья Емельянов',
          phone: '+7 (883) 508-3269',
          role: 'driver' as Role,
        },
      ],
    }
    const action = { payload: 1, type: deleteEmployee.fulfilled.type }
    const state = reducer(initialStateWithEmployees, action)

    expect(state.employees).toHaveLength(0)
  })

  it('should handle employeesForRender', () => {
    const action = { payload: [{ id: 1, name: 'John Doe' }], type: employeesForRender.type }
    const state = reducer(initialState, action)

    expect(state.employees).toEqual(action.payload)
  })

  it('should handle setSelectedEmployeesRole', () => {
    const action = { payload: ['Manager'], type: setSelectedEmployeesRole.type }
    const state = reducer(initialState, action)

    expect(state.selectedEmployeesRole).toEqual(action.payload)
  })

  it('should handle setSelectedEmployeesStatus', () => {
    const action = { payload: true, type: setSelectedEmployeesStatus.type }
    const state = reducer(initialState, action)

    expect(state.selectedEmployeesStatus).toBe(true)
  })
})
