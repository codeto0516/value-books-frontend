import { useFetchApi } from '@/shared/utils/useFetchApi'
import { usePostApi } from '@/shared/utils/usePostApi'
import { useCallback, useMemo } from 'react'
import { mutate } from 'swr'
import type { ResponseBook } from '../types/book'
import type { z } from 'zod'
import type { BookSchema } from '../schemas/BookSchema'

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/purchases`

export const useFetchBookAll = () => {
  const endpoint = useMemo(() => `${BASE_URL}`, [])

  const { data, isLoading, error } = useFetchApi<ResponseBook[]>(endpoint)

  const refetch = useCallback(() => {
    mutate<ResponseBook[]>(endpoint)
  }, [endpoint])

  return { data, isLoading, error, refetch }
}

export const useFetchBook = (id: string) => {
  const endpoint = useMemo(() => `${BASE_URL}/${id}`, [id])

  const { data, isLoading, error } = useFetchApi<ResponseBook>(endpoint)

  const refetch = useCallback(() => {
    mutate<ResponseBook>(endpoint)
  }, [endpoint])

  return { data, isLoading, error, refetch }
}

export const useBookApi = () => {
  const { execute, isLoading, error } = usePostApi()

  const createBook = (newData: z.infer<typeof BookSchema>) => {
    const endpoint = `${BASE_URL}`

    return execute(endpoint, {
      method: 'POST',
      body: JSON.stringify(newData)
    })
  }

  const updateBook = (id: string, newData: z.infer<typeof BookSchema>) => {
    const endpoint = `${BASE_URL}/${id}`

    return execute(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(newData)
    })
  }

  const deleteBook = (id: string) => {
    const endpoint = `${BASE_URL}/${id}`

    return execute(endpoint, {
      method: 'DELETE'
    })
  }

  return { isLoading, error, createBook, updateBook, deleteBook }
}
