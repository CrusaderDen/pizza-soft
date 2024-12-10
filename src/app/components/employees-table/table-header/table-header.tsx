import { SortButton } from '@/app/components/employees-table/table-action-buttons/sort-button/sort-button'
import { TableCell } from '@/app/components/employees-table/table-cell/table-cell'

export const TableHeader = () => {
  return (
    <>
      <TableCell cellType={'header'} />
      <TableCell cellType={'header'} />
      <TableCell cellType={'header'}>
        <span>Имя</span>
        <SortButton field={'name'} />
      </TableCell>
      <TableCell cellType={'header'}>Телефон</TableCell>
      <TableCell cellType={'header'}>Роль</TableCell>
      <TableCell cellType={'header'}>
        <span> Дата рождения</span>
        <SortButton field={'birthday'} />
      </TableCell>
      <TableCell cellType={'header'}>Архив</TableCell>
    </>
  )
}
