import { useState } from 'react'

import { Employee } from '@/api/app-api.types'
import { setEmployees } from '@/app/store/app-slice'
import { useAppDispatch } from '@/app/store/store'

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

      dispatch(setEmployees(sorted))
      setNameSort('↓')
    }
    if (nameSort === '↓') {
      const sorted = [...employees].sort((a, b) => (a.name > b.name ? -1 : 1))

      dispatch(setEmployees(sorted))
      setNameSort('↑')
    }
    if (nameSort === '↑') {
      const sorted = [...employees].sort((a, b) => a.id - b.id)

      dispatch(setEmployees(sorted))
      setNameSort('↕')
    }
  }

  const handleBirthdaySort = () => {
    setNameSort('↕')
    if (birthdaySort === '↕') {
      const sorted = [...employees].sort((a, b) => parseDate(a.birthday) - parseDate(b.birthday))

      dispatch(setEmployees(sorted))
      setBirthdaySort('↓')
    }
    if (birthdaySort === '↓') {
      const sorted = [...employees].sort((a, b) => parseDate(b.birthday) - parseDate(a.birthday))

      dispatch(setEmployees(sorted))
      setBirthdaySort('↑')
    }
    if (birthdaySort === '↑') {
      const sorted = [...employees].sort((a, b) => a.id - b.id)

      dispatch(setEmployees(sorted))
      setBirthdaySort('↕')
    }
  }

  return { birthdaySort, handleBirthdaySort, handleNameSort, nameSort }
}
