import { PropsWithChildren } from 'react'

import s from './main-layout.module.scss'

export const MainLayout = ({ children }: PropsWithChildren) => {
  return <div className={s.mainLayoutWrapper}>{children}</div>
}
