export enum PostStatusEnum {
  Draft = 'draft',
  Published = 'published',
  WaitApproval = 'waitApproval',
  Scheduled = 'scheduled'
}

/**
 * 公開中
 * 下書き
 * 承認待ち
 * 予約投稿
 */

export type PostStatus = 'draft' | 'published' | 'waitApproval' | 'scheduled'
