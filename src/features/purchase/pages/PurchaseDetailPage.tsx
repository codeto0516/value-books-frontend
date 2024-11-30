'use client'

import { PageLayout } from '@/shared/components/layout/page/PageLayout'
import { PurchaseEditForm } from '../components/PurchaseEditForm'
import { purchaseDemoData } from '../constants/demoData'

export const PurchaseDetailPage = ({ purchaseId }: { purchaseId: string }) => {
  return (
    <PageLayout title={purchaseDemoData[0].bookName}>
      <PurchaseEditForm purchase={purchaseDemoData[0]} />
    </PageLayout>
  )
}
