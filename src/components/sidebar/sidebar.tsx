import { FiltersSection } from '@/components/sidebar/filters-section/filters-section'

import s from './sidebar.module.scss'

export const Sidebar = ({ selectedRoles, setSelectedRoles, setSortBy, setStatusChecked }: any) => {
  return (
    <div className={s.sidebar}>
      <div style={{ alignSelf: 'center', fontSize: '24px', fontWeight: '700' }}>Pizza HRM</div>
      <FiltersSection
        selectedRoles={selectedRoles}
        setSelectedRoles={setSelectedRoles}
        setStatusChecked={setStatusChecked}
      />
      <button onClick={() => setSortBy('asc')} type={'button'}>
        Сортировка по имени по возрастанию
      </button>
      <button onClick={() => setSortBy('desc')} type={'button'}>
        Сортировка по имени по убыванию
      </button>
      <button onClick={() => setSortBy('default')} type={'button'}>
        Сортировка по имени по дефолту
      </button>
    </div>
  )
}
