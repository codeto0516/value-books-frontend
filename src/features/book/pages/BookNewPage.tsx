'use client'

import { PageLayout } from '@/shared/components/layout/page/PageLayout'
import { purchaseDemoData } from '../constants/demoData'
import { useBookApi } from '../api/useBookApi'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BookNewSchema } from '../schemas/BookSchema'
import type { z } from 'zod'
import { useRouter } from 'next/navigation'
import { BookNewForm } from '../components/BookNewForm'

export const BookNewPage = () => {
  return <FetchComponent />
}

const FetchComponent = () => {
  return <MainComponent />
}

const MainComponent = () => {
  const router = useRouter()
  const { createBook, isLoading, error } = useBookApi()

  const form = useForm<z.infer<typeof BookNewSchema>>({
    resolver: zodResolver(BookNewSchema)
  })

  const onSubmit = form.handleSubmit(async data => {
    const result = await createBook(data)
    if (result) {
    }
  })

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <PageLayout title={purchaseDemoData[0].bookName}>
          <BookNewForm isLoading={isLoading} onRequest={onSubmit} />
        </PageLayout>
      </form>
    </FormProvider>
  )
}
