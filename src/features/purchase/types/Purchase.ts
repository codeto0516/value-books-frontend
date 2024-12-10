import type { User } from '@/features/user/types/user'
import type { PurchaseOperationEnum } from './purchase-operation.enum'

export interface ResponsePurchase {
  id: number
  bookId: number
  userId: number
  price: number
  status: number
  comment?: string
  purchasedAt: Date

  histories: {
    id: number
    purchaseId: number
    userId: number
    description?: string
    operation: PurchaseOperationEnum
    operatedUser: User
    createdAt: Date
    updatedAt: Date
  }[]

  book: {
    id: number
    title: string
    author?: string
    isbn?: string
    description?: string
    publisher?: string
    publicationYear?: number
    thumbnailLink?: string
    createdAt: Date
    updatedAt: Date
  }

  createdUser: User
  createdAt: Date
  updatedAt: Date
}
