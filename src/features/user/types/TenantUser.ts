export interface TenantUser {
  id: number
  name: string
  email: string
  roleId: number
  roleName: string
  tenantId: number
  isActivated: boolean
  tenantName: string
  lastLoginAt: string
  createdAt: string
  updatedAt: string
}
