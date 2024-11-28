export interface Purchase {
  id: number
  bookId: number
  bookName: string
  amount: number
  status: string
  statusId: number
  comment: string
  purchaseAt: Date

  requestedUserId: number
  requestedUserName: string
  createdAt: string
  updatedAt: string
}
