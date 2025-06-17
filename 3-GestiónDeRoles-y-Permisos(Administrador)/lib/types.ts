export interface Role {
  id: string
  name: string
  permissions: string[]
}

export interface User {
  id: string
  name: string
  email: string
  roleId: string
}
