import { PropsWithChildren } from 'react'

import { Sidebar } from '@/app/components/sidebar/sidebar'

import s from './main-layout.module.scss'

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={s.mainLayoutWrapper}>
      <Sidebar />
      <main>{children}</main>
    </div>
  )
}
