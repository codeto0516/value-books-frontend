import type { Category } from '@/features/category/types/Post'

export interface Post {
  id: number
  title: string
  description: string
  path: string
  content: string
  statusId: number
  status: string
  thumbnailId: number
  isDisplayThumbnail: boolean
  updatedTenantUserId: number
  updatedTenantUserName: string
  authorTenantUserId: number
  authorTenantUserName: string
  tenantId: number
  tenantName: string
  categories: Category[]
  publishedAt: string
  createdAt: string
  updatedAt: string
}
