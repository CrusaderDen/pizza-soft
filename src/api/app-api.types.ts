export type Employee = {
  birthday: string
  id: number
  isArchive: boolean
  name: string
  phone: string
  role: Role
}

export type Role = 'cook' | 'driver' | 'waiter'
