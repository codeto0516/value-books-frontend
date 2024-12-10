'use client'

import { PageLayout } from '@/shared/components/layout/page/PageLayout'
import { purchaseDemoData } from '../constants/demoData'
import { usePurchaseApi } from '../api/usePurchaseApi'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PurchaseNewSchema } from '../schemas/PurchaseSchema'
import type { z } from 'zod'
import { useRouter } from 'next/navigation'
import { PurchaseNewForm } from '../components/PurchaseNewForm'

export const PurchaseNewPage = () => {
  return <FetchComponent />
}

const FetchComponent = () => {
  return <MainComponent />
}

const MainComponent = () => {
  const router = useRouter()
  const { createPurchase, isLoading, error } = usePurchaseApi()

  const form = useForm<z.infer<typeof PurchaseNewSchema>>({
    resolver: zodResolver(PurchaseNewSchema)
  })

  const onSubmit = form.handleSubmit(async data => {
    const result = await createPurchase(data)
    if (result) {
    }
  })

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <PageLayout title={purchaseDemoData[0].bookName}>
          <PurchaseNewForm isLoading={isLoading} onRequest={onSubmit} />
        </PageLayout>
      </form>
    </FormProvider>
  )
}
