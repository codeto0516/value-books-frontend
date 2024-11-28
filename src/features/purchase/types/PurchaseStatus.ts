export enum PurchaseStatusEnum {
  Draft = 'draft',
  UnApproved = 'unapproved',
  Approved = 'approved'
}

/**
 * 下書き
 * 承認待ち
 * 承認済み
 */

export type PurchaseStatus = keyof typeof PurchaseStatusEnum
