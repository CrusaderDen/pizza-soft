import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { TableContent } from '@/app/components/employees-table/table-content/table-content'
import { TableHeader } from '@/app/components/employees-table/table-header/table-header'
import { setSelectedFilter } from '@/app/store/app-slice'
import { fetchEmployeesThunk } from '@/app/store/app-thunks'
import { useAppDispatch, useAppSelector } from '@/app/store/store'
import NProgress from 'nprogress'

import s from './employees-table.module.scss'

let firstRenderFlag = true

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
    NProgress.start()
  } else {
    NProgress.done()
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className={s.gridTable}>
      <TableHeader />
      <TableContent employees={filteredEmployees} />
    </div>
  )
}
