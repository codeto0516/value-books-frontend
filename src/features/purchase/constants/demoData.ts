import type { Purchase } from '../types/Purchase'

export const purchaseDemoData: Purchase[] = Array.from({ length: 10 }).map(
  (_, index) =>
    ({
      id: 1,
      bookId: 1,
      bookName: 'Post 1',
      amount: 1000,
      statusId: 1,
      status: '下書き',
      comment: 'comment 1',
      purchaseAt: new Date(),
      requestedUserId: 1,
      requestedUserName: 'user 1',
      createdAt: '2021/10/01',
      updatedAt: '2021/10/01'
    }) as Purchase
)
