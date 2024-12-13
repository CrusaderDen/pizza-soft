import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { TableContent } from '@/app/components/employees-table/table-content/table-content'
import { TableHeader } from '@/app/components/employees-table/table-header/table-header'
import { Loader } from '@/app/shared/loader/loader'
import { setSelectedFilter } from '@/app/store/app-slice'
import { fetchEmployeesThunk } from '@/app/store/app-thunks'
import { useAppDispatch, useAppSelector } from '@/app/store/store'

let firstRenderFlag = true

import s from './employees-table.module.scss'

export const EmployeesTable = () => {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()
  const { activeFilters, error, filteredEmployees, loading } = useAppSelector(
    state => state.employees
  )

  useEffect(() => {
    if (firstRenderFlag && searchParams.size) {
      firstRenderFlag = false
      const activeFiltersArr = searchParams.get('f')?.split(',')

      // const activeSortArr = searchParams.get('sort')?.split(',')
      //
      // console.log(activeSortArr)
      dispatch(setSelectedFilter({ action: 'replace', filterValue: activeFiltersArr }))
    }
    dispatch(fetchEmployeesThunk(searchParams.size ? { filters: searchParams.get('f') } : ''))
  }, [dispatch, activeFilters, searchParams])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!filteredEmployees || !filteredEmployees.length) {
    return <div>Данные по сотрудникам отсутствуют.</div>
  }

  return (
    <div className={s.gridTable}>
      <TableHeader />
      <TableContent employees={filteredEmployees} />
    </div>
  )
}
