import { useFetchApi } from '@/shared/utils/useFetchApi'
import { usePostApi } from '@/shared/utils/usePostApi'
import { useCallback, useMemo } from 'react'
import { mutate } from 'swr'
import type { ResponsePurchase } from '../types/Purchase'
import type { z } from 'zod'
import type { PurchaseSchema } from '../schemas/PurchaseSchema'

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/purchases`

export const useFetchPurchaseAll = () => {
  const endpoint = useMemo(() => `${BASE_URL}`, [])

  const { data, isLoading, error } = useFetchApi<ResponsePurchase[]>(endpoint)

  const refetch = useCallback(() => {
    mutate<ResponsePurchase[]>(endpoint)
  }, [endpoint])

  return { data, isLoading, error, refetch }
}

export const useFetchPurchase = (id: string) => {
  const endpoint = useMemo(() => `${BASE_URL}/${id}`, [id])

  const { data, isLoading, error } = useFetchApi<ResponsePurchase>(endpoint)

  const refetch = useCallback(() => {
    mutate<ResponsePurchase>(endpoint)
  }, [endpoint])

  return { data, isLoading, error, refetch }
}

export const usePurchaseApi = () => {
  const { execute, isLoading, error } = usePostApi()

  const createPurchase = (newData: z.infer<typeof PurchaseSchema>) => {
    const endpoint = `${BASE_URL}`

    return execute(endpoint, {
      method: 'POST',
      body: JSON.stringify(newData)
    })
  }

  const updatePurchase = (id: string, newData: z.infer<typeof PurchaseSchema>) => {
    const endpoint = `${BASE_URL}/${id}`

    return execute(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(newData)
    })
  }

  const deletePurchase = (id: string) => {
    const endpoint = `${BASE_URL}/${id}`

    return execute(endpoint, {
      method: 'DELETE'
    })
  }

  return { isLoading, error, createPurchase, updatePurchase, deletePurchase }
}
