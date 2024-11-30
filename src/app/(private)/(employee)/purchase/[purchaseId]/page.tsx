import { PurchaseDetailPage } from '@/features/purchase/pages/PurchaseDetailPage'

export default function Page({ params }: { params: { purchaseId: string } }) {
  return <PurchaseDetailPage purchaseId={params.purchaseId} />
}
