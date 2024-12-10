export type Employee = {
  birthday: string
  id: number
  isArchive: boolean
  name: string
  phone: string
  role: string
}

export type Role = 'archived' | 'cook' | 'driver' | 'waiter'
