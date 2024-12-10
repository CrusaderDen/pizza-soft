import { FilterRole } from '@/api/app-api.types'

export const RolesForDropdown: FilterRole[] = [
  ['waiter', 'Официанты'],
  ['driver', 'Водители'],
  ['cook', 'Повара'],
]

export const RoleForSingleOption: FilterRole = ['archived', 'в архиве']
