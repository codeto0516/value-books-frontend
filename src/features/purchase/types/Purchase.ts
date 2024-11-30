export interface Purchase {
  id: number
  bookId: number
  bookName: string
  bookThumbnail: string
  bookAuthor: string
  amount: number
  status: string
  statusId: number
  comment: string
  purchaseAt: Date

  updatedHistories: {
    id: number
    operationId: number
    operation: string // 申請, 承認, 却下
    updatedUserId: number
    updatedUserName: string
    description: string
    createdAt: string
  }[]

  requestedUserId: number
  requestedUserName: string
  createdAt: string
  updatedAt: string
}
