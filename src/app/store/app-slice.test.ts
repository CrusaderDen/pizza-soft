import { Role } from '@/api/app-api.types'
import { addEmployeeThunk, deleteEmployeeThunk, updateEmployeeThunk } from '@/app/store/app-thunks'
import reducer, {
  fetchEmployees,
  setEmployees,
  setSelectedEmployeesRole,
  setSelectedEmployeesStatus,
} from 'app/store/app-slice'
import { describe, expect, it } from 'vitest'

describe('app-slice', () => {
  const initialState = {
    employees: [],
    error: null,
    filteredEmployees: [],
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
    const action = { payload: newEmployee, type: addEmployeeThunk.fulfilled.type }
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
          role: 'водитель' as Role,
        },
      ],
    }
    const updatedEmployee = {
      birthday: '12.02.1982',
      id: 1,
      isArchive: false,
      name: 'Илья Емельянов',
      phone: '+7 (883) 508-3269',
      role: 'повар',
    }
    const action = { payload: updatedEmployee, type: updateEmployeeThunk.fulfilled.type }
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
          role: 'водитель' as Role,
        },
      ],
    }
    const action = { payload: 1, type: deleteEmployeeThunk.fulfilled.type }
    const state = reducer(initialStateWithEmployees, action)

    expect(state.employees).toHaveLength(0)
  })

  it('should handle employeesForRender', () => {
    const action = { payload: [{ id: 1, name: 'John Doe' }], type: setEmployees.type }
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
