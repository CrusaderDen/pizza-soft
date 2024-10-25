import { FiltersSection } from '@/components/sidebar/filters-section/filters-section'

import s from './sidebar.module.scss'

export const Sidebar = ({
  selectedRoles,
  setSelectedRoles,
  setSortByDateOfBirthday,
  setSortByName,
  setStatusChecked,
}: any) => {
  return (
    <div className={s.sidebar}>
      <div style={{ alignSelf: 'center', fontSize: '24px', fontWeight: '700' }}>Pizza HRM</div>
      <FiltersSection
        selectedRoles={selectedRoles}
        setSelectedRoles={setSelectedRoles}
        setStatusChecked={setStatusChecked}
      />
      <button onClick={() => setSortByName('asc')} type={'button'}>
        Сортировка по имени по возрастанию
      </button>
      <button onClick={() => setSortByName('desc')} type={'button'}>
        Сортировка по имени по убыванию
      </button>
      <button onClick={() => setSortByName('default')} type={'button'}>
        Сортировка по имени по дефолту
      </button>
      <button onClick={() => setSortByDateOfBirthday('asc')} type={'button'}>
        Сортировка по ДР по возрастанию
      </button>
      <button onClick={() => setSortByDateOfBirthday('desc')} type={'button'}>
        Сортировка по ДР по убыванию
      </button>
    </div>
  )
}
