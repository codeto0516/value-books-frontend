'use client'

import { PageLayout } from '@/shared/components/layout/page/PageLayout'
import { PurchaseEditForm } from '../components/PurchaseEditForm'
import { purchaseDemoData } from '../constants/demoData'
import { useFetchPurchase, usePurchaseApi } from '../api/usePurchaseApi'
import type { ResponsePurchase } from '../types/Purchase'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PurchaseSchema } from '../schemas/PurchaseSchema'
import type { z } from 'zod'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

export const PurchaseDetailPage = ({ purchaseId }: { purchaseId: string }) => {
  return <FetchComponent purchaseId={purchaseId} />
}

const FetchComponent = ({ purchaseId }: { purchaseId: string }) => {
  const purchaseAllFetcher = useFetchPurchase(purchaseId)

  if (purchaseAllFetcher.isLoading) {
    return <div>Loading...</div>
  }

  if (purchaseAllFetcher.error) {
    return <div>Error</div>
  }

  return (
    <MainComponent
      purchaseId={purchaseId}
      purchase={purchaseAllFetcher.data ?? ({} as ResponsePurchase)}
      refetch={purchaseAllFetcher.refetch}
    />
  )
}

const MainComponent = ({
  purchaseId,
  purchase,
  refetch
}: {
  purchaseId: string
  purchase: ResponsePurchase
  refetch: () => void
}) => {
  const router = useRouter()
  const { updatePurchase, deletePurchase, isLoading, error } = usePurchaseApi()

  const form = useForm<z.infer<typeof PurchaseSchema>>({
    resolver: zodResolver(PurchaseSchema),
    values: {
      purchasedAt: new Date(purchase.purchasedAt),
      price: purchase.price,
      comment: purchase.comment
    }
  })

  const onSubmit = form.handleSubmit(async data => {
    const result = await updatePurchase(purchaseId, data)
    if (result) {
      refetch()
    }
  })

  const onDelete = useCallback(async () => {
    const result = await deletePurchase(purchaseId)
    if (result) {
      router.push('/purchase')
    }
  }, [deletePurchase, purchaseId, router])

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <PageLayout title={purchaseDemoData[0].bookName}>
          <PurchaseEditForm purchase={purchase} isLoading={isLoading} onRequest={onSubmit} onDelete={onDelete} />
        </PageLayout>
      </form>
    </FormProvider>
  )
}
