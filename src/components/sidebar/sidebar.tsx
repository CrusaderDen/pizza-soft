import { Link } from 'react-router-dom'

import { FiltersSection } from '@/components/sidebar/filters-section/filters-section'

import s from './sidebar.module.scss'

export const Sidebar = () => {
  return (
    <div className={s.sidebar}>
      <div style={{ alignSelf: 'center', fontSize: '24px', fontWeight: '700' }}>Pizza-soft</div>
      <Link to={'/employees-table'}>Employees table</Link>
      <Link to={'/create-employee'}>Create Employee</Link>
      <FiltersSection />
    </div>
  )
}
