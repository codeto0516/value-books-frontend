export interface User {
  id: number
  name: string
  email: string
  password?: string
  budget: number
  avatar?: string
  isAdmin: boolean

  createdAt: Date
  updatedAt: Date
}
