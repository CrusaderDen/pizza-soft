import { FiltersSection } from '@/components/sidebar/filters-section/filters-section'

import s from './sidebar.module.scss'

export const Sidebar = ({ selectedRoles, setSelectedRoles, setStatusChecked }: any) => {
  return (
    <div className={s.sidebar}>
      <div style={{ alignSelf: 'center', fontSize: '24px', fontWeight: '700' }}>Pizza HRM</div>
      <FiltersSection
        selectedRoles={selectedRoles}
        setSelectedRoles={setSelectedRoles}
        setStatusChecked={setStatusChecked}
      />
    </div>
  )
}
