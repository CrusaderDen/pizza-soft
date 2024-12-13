import { useSearchParams } from 'react-router-dom'

import { SortField } from '@/app/store/app-slice.types'

import s from './sort-button.module.scss'

type SortOrder = '' | 'asc' | 'desc'

type SortArrows = Record<SortOrder, string>

type SortButtonProps = {
  field: SortField
}

const sortArrows: SortArrows = {
  '': '↕',
  asc: '↑',
  desc: '↓',
}

export const SortButton = ({ field }: SortButtonProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const sortParams = searchParams.get('sort')?.split(',') || ''
  const sortField = sortParams[0]
  const sortOrder = sortParams[1] || ''
  const sortLabel = sortField === field ? sortArrows[sortOrder as SortOrder] : sortArrows['']

  const handleSort = () => {
    setSearchParams({ sort: [field, sortOrder].join(',') })

    if (sortOrder === '') {
      setSearchParams({ sort: [field, 'desc'].join(',') })
    }
    if (sortOrder === 'desc') {
      setSearchParams({ sort: [field, 'asc'].join(',') })
    }
    if (sortOrder === 'asc') {
      setSearchParams({ sort: [field].toString() })
    }
  }

  return (
    <button className={s.sortBtn} onClick={handleSort} type={'button'}>
      {sortLabel}
    </button>
  )
}
