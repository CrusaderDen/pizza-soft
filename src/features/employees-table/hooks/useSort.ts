import { useState } from 'react'

import { Employee } from '@/api/app-api.types'
import { employeesForRender } from '@/app/app-slice'
import { useAppDispatch } from '@/app/hooks'

type SortArrow = '↑' | '↓' | '↕'

export const useSort = (employees: Employee[]) => {
  const dispatch = useAppDispatch()
  const [nameSort, setNameSort] = useState<SortArrow>('↕')
  const [birthdaySort, setBirthdaySort] = useState<SortArrow>('↕')
  const parseDate = (dateString: string): number => {
    const [day, month, year] = dateString.split('.').map(Number)

    return new Date(year, month - 1, day).getTime()
  }
  const handleNameSort = () => {
    setBirthdaySort('↕')
    if (nameSort === '↕') {
      const sorted = [...employees].sort((a, b) => (a.name < b.name ? -1 : 1))

      dispatch(employeesForRender(sorted))
      setNameSort('↓')
    }
    if (nameSort === '↓') {
      const sorted = [...employees].sort((a, b) => (a.name > b.name ? -1 : 1))

      dispatch(employeesForRender(sorted))
      setNameSort('↑')
    }
    if (nameSort === '↑') {
      const sorted = [...employees].sort((a, b) => a.id - b.id)

      dispatch(employeesForRender(sorted))
      setNameSort('↕')
    }
  }

  const handleBirthdaySort = () => {
    setNameSort('↕')
    if (birthdaySort === '↕') {
      const sorted = [...employees].sort((a, b) => parseDate(a.birthday) - parseDate(b.birthday))

      dispatch(employeesForRender(sorted))
      setBirthdaySort('↓')
    }
    if (birthdaySort === '↓') {
      const sorted = [...employees].sort((a, b) => parseDate(b.birthday) - parseDate(a.birthday))

      dispatch(employeesForRender(sorted))
      setBirthdaySort('↑')
    }
    if (birthdaySort === '↑') {
      const sorted = [...employees].sort((a, b) => a.id - b.id)

      dispatch(employeesForRender(sorted))
      setBirthdaySort('↕')
    }
  }

  return { birthdaySort, handleBirthdaySort, handleNameSort, nameSort }
}
