export enum BookStatusEnum {
  /**
   * 利用可能
   */
  Available = 1,

  /**
   * 貸出中
   */
  OnBorrow = 2,

  /**
   * 予約済み
   */
  Reserved = 3,

  /**
   * 延滞中
   */
  Overdue = 4,

  /**
   * 紛失
   */
  Lost = 5,

  /**
   * 修理中
   */
  InRepair = 6,

  /**
   * 除籍
   */
  Withdrawn = 7
}

export enum BookStatusTextEnum {
  Available = '利用可能',
  OnBorrow = '貸出中',
  Reserved = '予約済み',
  Overdue = '延滞中',
  Lost = '紛失',
  InRepair = '修理中',
  Withdrawn = '除籍'
}
