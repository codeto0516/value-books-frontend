export interface Category {
  id: number
  name: string
  description: string
  isActivated: boolean
  parentId: number
  slug: string
  sortOrder: number
  tenantId: number
  updatedTenantUserId: number
  updatedTenantUserName: string
  tenantName: string
  createdAt: string
  updatedAt: string
}
