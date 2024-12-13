import { PropsWithChildren } from 'react'
import { Link, useLocation } from 'react-router-dom'

import clsx from 'clsx'

import s from './sidebar-link.module.scss'

type SidebarLinkProps = {
  to: string
} & PropsWithChildren

export const SidebarLink = ({ children, to }: SidebarLinkProps) => {
  const { pathname } = useLocation()

  return (
    <Link className={clsx(s.link, pathname === to ? s.linkIsActive : '')} to={to}>
      {children}
    </Link>
  )
}
