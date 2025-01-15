'use client'

import { PageLayout } from '@/shared/components/layout/page/PageLayout'
import { BookEditForm } from '../components/BookEditForm'
import { purchaseDemoData } from '../constants/demoData'
import { useFetchBook, useBookApi } from '../api/useBookApi'
import type { ResponseBook } from '../types/Book'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BookSchema } from '../schemas/BookSchema'
import type { z } from 'zod'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

export const BookDetailPage = ({ purchaseId }: { purchaseId: string }) => {
  return <FetchComponent purchaseId={purchaseId} />
}

const FetchComponent = ({ purchaseId }: { purchaseId: string }) => {
  const purchaseAllFetcher = useFetchBook(purchaseId)

  if (purchaseAllFetcher.isLoading) {
    return <div>Loading...</div>
  }

  if (purchaseAllFetcher.error) {
    return <div>Error</div>
  }

  return (
    <MainComponent
      purchaseId={purchaseId}
      purchase={purchaseAllFetcher.data ?? ({} as ResponseBook)}
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
  purchase: ResponseBook
  refetch: () => void
}) => {
  const router = useRouter()
  const { updateBook, deleteBook, isLoading, error } = useBookApi()

  const form = useForm<z.infer<typeof BookSchema>>({
    resolver: zodResolver(BookSchema),
    values: {
      purchasedAt: new Date(purchase.purchasedAt),
      price: purchase.price,
      comment: purchase.comment
    }
  })

  const onSubmit = form.handleSubmit(async data => {
    const result = await updateBook(purchaseId, data)
    if (result) {
      refetch()
    }
  })

  const onDelete = useCallback(async () => {
    const result = await deleteBook(purchaseId)
    if (result) {
      router.push('/purchase')
    }
  }, [deleteBook, purchaseId, router])

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <PageLayout title={purchaseDemoData[0].bookName}>
          <BookEditForm purchase={purchase} isLoading={isLoading} onRequest={onSubmit} onDelete={onDelete} />
        </PageLayout>
      </form>
    </FormProvider>
  )
}
