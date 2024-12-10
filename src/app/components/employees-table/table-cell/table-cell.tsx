import { PropsWithChildren } from 'react'

import s from './table-cell.module.scss'

type TableCellProps = {
  cellType: 'content' | 'header'
} & PropsWithChildren

export const TableCell = ({ cellType, children }: TableCellProps) => {
  let style

  switch (cellType) {
    case 'header':
      style = s.gridHeader
      break
    case 'content':
      style = s.gridContent
      break
    default:
      style = s.gridContent
  }

  return <div className={style}>{children}</div>
}
