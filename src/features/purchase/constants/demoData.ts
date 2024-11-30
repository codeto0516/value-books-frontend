import type { Purchase } from '../types/Purchase'

export const purchaseDemoData: Purchase[] = Array.from({ length: 40 }).map(
  (_, index) =>
    ({
      id: 1,
      bookId: 1,
      bookName: 'オブジェクト指向UIデザイン──使いやすいソフトウェアの原理',
      bookThumbnail:
        'http://books.google.com/books/content?id=1FGpzQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_apiS',
      bookAuthor: 'ソシオメディア株式会社 (著), 上野 学 (著, 監修), 藤井 幸多 (著)',
      amount: 1000,
      statusId: 3,
      status: '承認済み',
      comment: 'comment 1',
      purchaseAt: new Date(),
      requestedUserId: 1,
      requestedUserName: '山田　太郎',

      updatedHistories: [
        {
          id: 2,
          operationId: 2,
          operation: '承認',
          description: '理由が十分です。承認しました。',
          updatedUserId: 1,
          updatedUserName: '社長',
          createdAt: '2021/10/03'
        },
        {
          id: 3,
          operationId: 1,
          operation: '申請',
          description: '理由としては、この本を読んで、オブジェクト指向UIデザインについて学ぶためです。',
          updatedUserId: 1,
          updatedUserName: '山田　太郎',
          createdAt: '2021/10/03'
        },
        {
          id: 2,
          operationId: 3,
          operation: '却下',
          description: '理由が不十分です。再度申請してください。',
          updatedUserId: 1,
          updatedUserName: '社長',
          createdAt: '2021/10/03'
        },
        {
          id: 1,
          operationId: 1,
          operation: '申請',
          description: '勉強のために購入しました。承認お願いします。',
          updatedUserId: 1,
          updatedUserName: '山田　太郎',
          createdAt: '2021/10/01'
        }
      ],

      createdAt: '2021/10/01',
      updatedAt: '2021/10/01'
    }) as Purchase
)
